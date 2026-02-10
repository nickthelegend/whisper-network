"use client";

import { useState, useEffect, useCallback } from "react";

export interface WalletState {
    address: string;
    networkId: string;
    balance: string;
}

export function useMidnightWallet() {
    const [isConnected, setIsConnected] = useState(false);
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // @ts-ignore
            const midnight = window.midnight;
            if (!midnight) {
                throw new Error('Please install Lace Beta Wallet for Midnight Network');
            }

            // The user's snippet uses mnLace
            // @ts-ignore
            const wallet = midnight.mnLace || Object.values(midnight)[0];

            if (!wallet) {
                throw new Error('No Midnight wallet found in window.midnight');
            }

            console.log("Connecting to wallet:", wallet.name || "Unknown");

            // Try enable or connect, v4 might use connect
            // @ts-ignore
            const connectFn = wallet.enable || wallet.connect;

            if (typeof connectFn !== 'function') {
                console.error("Wallet API:", wallet);
                throw new Error(`Wallet '${wallet.name}' does not have enable/connect method. version: ${wallet.apiVersion}`);
            }

            // @ts-ignore
            const walletAPI = await connectFn.call(wallet, 'undeployed');

            if (!walletAPI) {
                throw new Error("Failed to get Wallet API after connection");
            }

            // According to user's snippet: const walletState = await walletAPI.state();
            // Some versions might use different methods
            let address = "";
            let balance = "0";
            let networkId = "unknown";

            try {
                // @ts-ignore
                if (typeof walletAPI.state === 'function') {
                    // @ts-ignore
                    const state = await walletAPI.state();
                    address = String(state.address || "");
                    balance = String(state.balance || "0");
                } else {
                    // Fallback to other possible methods if state() is not available
                    // @ts-ignore
                    if (typeof walletAPI.getUnshieldedAddress === 'function') {
                        // @ts-ignore
                        address = String(await walletAPI.getUnshieldedAddress() || "");
                    }
                }
            } catch (e) {
                console.warn("Could not fetch wallet state:", e);
            }

            setWalletState({
                address,
                balance,
                networkId
            });
            setIsConnected(true);
            return walletAPI;
        } catch (err: any) {
            console.error("Wallet Connection Error:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const disconnectWallet = useCallback(() => {
        setIsConnected(false);
        setWalletState(null);
    }, []);

    // Optional: Auto-connect check
    useEffect(() => {
        // We could check if already enabled here if the wallet supports it
    }, []);

    return {
        connectWallet,
        disconnectWallet,
        walletState,
        isConnected,
        loading,
        error
    };
}
