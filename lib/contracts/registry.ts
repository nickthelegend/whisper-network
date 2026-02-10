import { MidnightSetupAPI } from "@/lib/midnight-setup";
import { setupProviders } from "../providers";
import { Contract } from "@/managed/whisper_registry/contract";
import { getWhisperSecret } from "../secret-manager";

export async function joinRegistry(address: string): Promise<any> {
    const providers = await setupProviders();
    const walletState = await (window as any).midnight.mnLace.state();
    const secret = await getWhisperSecret(walletState.address);

    const contractInstance = new Contract({
        get_secret_key: (context) => {
            return [context.privateState, secret] as any;
        }
    });

    return await (MidnightSetupAPI as any).joinContract(providers, contractInstance as any, address);
}

export async function getWhisperCommitment(secret: Uint8Array): Promise<Uint8Array> {
    // This matches the persistentHash logic but in JS for resolution checks
    const hashBuffer = await crypto.subtle.digest('SHA-256', secret as any);
    return new Uint8Array(hashBuffer);
}

export async function deployRegistry(): Promise<any> {
    const providers = await setupProviders();
    const walletState = await (window as any).midnight.mnLace.state();
    const secret = await getWhisperSecret(walletState.address);

    const contractInstance = new Contract({
        get_secret_key: (context) => {
            return [context.privateState, secret] as any;
        }
    });

    return await (MidnightSetupAPI as any).deployContract(providers, contractInstance as any);
}

export async function checkAvailability(api: any, handleHash: Uint8Array): Promise<boolean> {
    // circuit check_availability returns Boolean
    const isAvailable = await api.check_availability(handleHash);
    return isAvailable;
}

export async function registerHandle(
    api: any,
    handleHash: Uint8Array,
    ownershipCommitment: Uint8Array,
    encryptionPubkey: Uint8Array
): Promise<string> {
    const result = await api.register_handle(
        handleHash,
        ownershipCommitment,
        encryptionPubkey
    );
    return result.txHash;
}

export async function resolveHandle(api: any, handleHash: Uint8Array): Promise<string | null> {
    // The ledger returns Uint8Array for Bytes<65>
    // but lookup might fail if not found. Compact usually throws or returns a default?
    // Actually, let's use the circuit 'resolve_key' if possible, or ledger state.
    // If using ledger state directly:
    try {
        const state: any = await api.getLedgerState();
        const pubKeyBytes = state.ledgerState.public_keys.lookup(handleHash);
        if (!pubKeyBytes) return null;

        // Convert Uint8Array to hex string (without 0x for eth-crypto usually, or with 0x)
        // eth-crypto expects '04...' hex string usually.
        return Buffer.from(pubKeyBytes).toString('hex');
    } catch (e) {
        console.error("Resolve error:", e);
        return null;
    }
}
