import type { MidnightSetupContractProviders } from "@meshsdk/midnight-setup";

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
    // Dynamic imports to prevent top-level Midnight SDK errors during initial load
    const { FetchZkConfigProvider } = await import("@midnight-ntwrk/midnight-js-fetch-zk-config-provider");
    const { httpClientProofProvider } = await import("@midnight-ntwrk/midnight-js-http-client-proof-provider");
    const { indexerPublicDataProvider } = await import("@midnight-ntwrk/midnight-js-indexer-public-data-provider");
    const { levelPrivateStateProvider } = await import("@midnight-ntwrk/midnight-js-level-private-state-provider");

    // @ts-ignore
    const wallet = window.midnight?.mnLace;
    // ...
    if (!wallet) {
        throw new Error("Please install Lace Beta Wallet for Midnight Network");
    }

    // @ts-ignore
    const connectFn = wallet.connect || wallet.enable;
    // @ts-ignore
    const walletAPI = await connectFn.call(wallet, 'undeployed');

    // @ts-ignore
    const walletState = await (walletAPI.state ? walletAPI.state() : walletAPI.getShieldedAddresses());
    // @ts-ignore
    const uris = await (wallet.serviceUriConfig ? wallet.serviceUriConfig() : walletAPI.getConfiguration());

    return {
        privateStateProvider: levelPrivateStateProvider({
            privateStateStoreName: "my-dapp-state",
        }),
        zkConfigProvider: new FetchZkConfigProvider(
            window.location.origin,
            // @ts-ignore
            fetch.bind(window),
        ),
        proofProvider: httpClientProofProvider(uris.proverServerUri),
        publicDataProvider: indexerPublicDataProvider(
            uris.indexerUri,
            uris.indexerWsUri,
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
}
