import { Buffer } from "buffer";

/**
 * Secret Manager for Whisper Network
 * In v1, we derive a deterministic secret from the user's wallet address.
 * In production, this should be a user-provided passphrase or a key signed by the wallet.
 */
export async function getWhisperSecret(walletAddress: string): Promise<Uint8Array> {
    // A simple deterministic derivation for the demo
    // In a real app, we'd use: const signature = await wallet.sign(message);
    const encoder = new TextEncoder();
    const data = encoder.encode(`whisper-secret-v1-${walletAddress}`);

    // Use Web Crypto to hash it to 32 bytes
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hashBuffer);
}

export async function getWhisperCommitment(secret: Uint8Array): Promise<Uint8Array> {
    // This matches the persistentHash logic but in JS for resolution checks
    const hashBuffer = await crypto.subtle.digest('SHA-256', secret);
    return new Uint8Array(hashBuffer);
}
