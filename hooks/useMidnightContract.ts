import { useState, useCallback } from 'react';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import { setupProviders } from '../lib/providers';

interface ContractHookReturn {
    api: MidnightSetupAPI | null;
    deployContract: (contractInstance: unknown) => Promise<MidnightSetupAPI>;
    joinContract: (contractInstance: unknown, address: string) => Promise<MidnightSetupAPI>;
    getContractState: () => Promise<unknown>;
    getLedgerState: () => Promise<unknown>;
    isLoading: boolean;
    error: string | null;
}

export function useMidnightContract(): ContractHookReturn {
    const [api, setApi] = useState<MidnightSetupAPI | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deployContract = useCallback(async (contractInstance: unknown) => {
        setIsLoading(true);
        setError(null);

        try {
            const providers = await setupProviders();
            const newApi = await MidnightSetupAPI.deployContract(
                providers,
                contractInstance as never
            );
            setApi(newApi);
            return newApi;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Deployment failed";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const joinContract = useCallback(async (contractInstance: unknown, address: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const providers = await setupProviders();
            const newApi = await MidnightSetupAPI.joinContract(
                providers,
                contractInstance as never,
                address
            );
            setApi(newApi);
            return newApi;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to join contract";
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getContractState = useCallback(async () => {
        if (!api) throw new Error('No contract API available');
        return await api.getContractState();
    }, [api]);

    const getLedgerState = useCallback(async () => {
        if (!api) throw new Error('No contract API available');
        return await api.getLedgerState();
    }, [api]);

    return {
        api,
        deployContract,
        joinContract,
        getContractState,
        getLedgerState,
        isLoading,
        error,
    };
}
