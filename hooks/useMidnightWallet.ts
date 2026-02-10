import { useState, useCallback, useEffect } from 'react';

interface WalletState {
    state: {
        address: string;
        coinPublicKey: string;
        encryptionPublicKey: string;
    };
    uris: {
        indexerUri: string;
        indexerWsUri: string;
        proverServerUri: string;
    };
    walletAPI: any;
}

export function useMidnightWallet() {
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = useCallback(async (isAutoConnect = false) => {
        setIsLoading(true);
        setError(null);
        try {
            // @ts-ignore
            const midnight = window.midnight;
            const wallet = midnight?.mnLace;

            if (!wallet) {
                if (!isAutoConnect) throw new Error("Please install Lace Beta Wallet for Midnight Network");
                return;
            }

            // Handle v3 (enable) and v4 (connect)
            // @ts-ignore
            const connectFn = wallet.connect || wallet.enable;
            // @ts-ignore
            const walletAPI = await connectFn.call(wallet, 'undeployed');

            // Get State with fallback for different API versions
            let stateData: any;
            if (typeof walletAPI.state === 'function') {
                stateData = await walletAPI.state();
            } else {
                // Fallback to standard dapp-connector methods
                const shieldedAddr = await walletAPI.getShieldedAddresses();
                stateData = {
                    address: shieldedAddr.shieldedAddress,
                    coinPublicKey: shieldedAddr.shieldedCoinPublicKey,
                    encryptionPublicKey: shieldedAddr.shieldedEncryptionPublicKey
                };
            }

            // Normalize address to string (handles objects returned by API)
            const rawAddress = stateData.address;
            const addressString = typeof rawAddress === 'string'
                ? rawAddress
                : (rawAddress?.address || rawAddress?.coinPublicKey || JSON.stringify(rawAddress));

            // Get URIs/Config with fallback
            let uris: any;
            if (typeof wallet.serviceUriConfig === 'function') {
                uris = await wallet.serviceUriConfig();
            } else if (typeof walletAPI.getConfiguration === 'function') {
                const config = await walletAPI.getConfiguration();
                uris = {
                    indexerUri: config.indexerUri,
                    indexerWsUri: config.indexerWsUri,
                    proverServerUri: config.proverServerUri || ""
                };
            }

            setWalletState({
                state: {
                    address: addressString,
                    coinPublicKey: stateData.coinPublicKey,
                    encryptionPublicKey: stateData.encryptionPublicKey
                },
                uris,
                walletAPI
            });
            setIsConnected(true);

            // Store hint for persistence
            localStorage.setItem('midnight_wallet_connected', 'true');
            console.log("Wallet Connected Successfully:", addressString);
        } catch (err) {
            if (!isAutoConnect) {
                console.error("Connection failed:", err);
                const message = err instanceof Error ? err.message : "Connection failed";
                setError(message);
                throw err;
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const disconnectWallet = useCallback(async () => {
        try {
            // @ts-ignore
            const wallet = window.midnight?.mnLace;
            if (wallet) {
                if (typeof wallet.disconnect === 'function') {
                    await wallet.disconnect();
                }
                localStorage.removeItem('midnight_wallet_connected');
                setWalletState(null);
                setIsConnected(false);
                setError(null);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Disconnect failed";
            setError(message);
        }
    }, []);

    // Persistent auto-connect logic
    useEffect(() => {
        let isMounted = true;

        const checkPersistence = async () => {
            // @ts-ignore
            const wallet = window.midnight?.mnLace;

            // Since isEnabled is missing in Lace 4.0.0, we use a localStorage hint
            // to trigger the SDK's connect() silently on mount.
            const shouldConnect = localStorage.getItem('midnight_wallet_connected') === 'true';

            if (wallet && shouldConnect && isMounted) {
                console.log("Middle SDK Hint: Connection requested, attempting silent reconnect...");
                await connectWallet(true);
            }
        };

        // Small delay to ensure extension injection
        const timeout = setTimeout(checkPersistence, 800);
        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [connectWallet]);

    return {
        connectWallet,
        disconnectWallet,
        walletState,
        isConnected,
        isLoading,
        error,
    };
}
