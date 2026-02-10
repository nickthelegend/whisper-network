import type { MidnightSetupContractProviders } from "@meshsdk/midnight-setup";

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
    console.log("%c[Providers] Initializing Midnight SDK stack...", "color: #3b82f6; font-weight: bold;");

    // Dynamic imports
    const { FetchZkConfigProvider } = await import("@midnight-ntwrk/midnight-js-fetch-zk-config-provider");
    const { httpClientProofProvider } = await import("@midnight-ntwrk/midnight-js-http-client-proof-provider");
    const { indexerPublicDataProvider } = await import("@midnight-ntwrk/midnight-js-indexer-public-data-provider");
    const { levelPrivateStateProvider } = await import("@midnight-ntwrk/midnight-js-level-private-state-provider");

    // @ts-ignore
    const wallet = window.midnight?.mnLace;
    if (!wallet) {
        console.warn("[Providers] Lace Wallet not found. Falling back to simulated providers.");
        return createMockProviders();
    }

    try {
        console.log("[Providers] Connecting to Lace Wallet API...");
        // @ts-ignore
        const connectFn = wallet.connect || wallet.enable;
        // @ts-ignore
        const walletAPI = await connectFn.call(wallet, 'undeployed');
        console.log("[Providers] Connected to Wallet API.");

        const uris = await (wallet.serviceUriConfig ? wallet.serviceUriConfig() : walletAPI.getConfiguration());
        console.log("[Providers] Service URIs received:", uris);

        // Connectivity check for the real prover server on 6300
        const proverUri = uris.proverServerUri || "http://localhost:6300";
        try {
            console.log(`[Providers] Testing connection to Prover: ${proverUri}...`);
            await fetch(proverUri, { mode: 'no-cors' });
            console.log("%c[Providers] Prover status: ONLINE", "color: #10b981; font-weight: bold;");
        } catch (e) {
            console.warn(`[Providers] Prover status: UNREACHABLE at ${proverUri}`);
        }

        console.log("[Providers] Fetching wallet state...");
        // @ts-ignore
        const walletState = await (walletAPI.state ? walletAPI.state() : walletAPI.getShieldedAddresses());

        return {
            privateStateProvider: levelPrivateStateProvider({
                privateStateStoreName: "whisper-dns-state",
            }),
            zkConfigProvider: new FetchZkConfigProvider(
                window.location.origin,
                // @ts-ignore
                fetch.bind(window),
            ),
            proofProvider: httpClientProofProvider(uris.proverServerUri || "http://localhost:6300"),
            publicDataProvider: indexerPublicDataProvider(
                uris.indexerUri || "http://localhost:8080",
                uris.indexerWsUri || "ws://localhost:8081",
            ),
            walletProvider: {
                coinPublicKey: walletState.coinPublicKey,
                encryptionPublicKey: walletState.encryptionPublicKey,
                balanceTx: (tx: any, newCoins: any) => {
                    return walletAPI.balanceAndProveTransaction(tx, newCoins);
                },
            },
            midnightProvider: {
                submitTx: (tx: any) => {
                    return walletAPI.submitTransaction(tx);
                },
            },
        };
    } catch (err) {
        console.error("[Providers] Real provider initiation failed, using fallback:", err);
        return createMockProviders();
    }
}

function createMockProviders(): MidnightSetupContractProviders {
    return {
        privateStateProvider: { name: "mock" } as any,
        zkConfigProvider: { name: "mock" } as any,
        proofProvider: { name: "mock" } as any,
        publicDataProvider: { name: "mock" } as any,
        walletProvider: {
            coinPublicKey: "0x001122...",
            encryptionPublicKey: "0x334455...",
            balanceTx: async () => ({}) as any,
        },
        midnightProvider: {
            submitTx: async () => ({}) as any,
        },
    };
}
