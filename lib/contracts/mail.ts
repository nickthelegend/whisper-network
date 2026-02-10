import { MidnightSetupAPI } from "@/lib/midnight-setup";
import { setupProviders } from "../providers";
import { Contract } from "@/managed/whisper_mail/contract";
import { getWhisperSecret } from "../secret-manager";

export async function joinMail(address: string): Promise<any> {
    const providers = await setupProviders();
    const walletState = await (window as any).midnight.mnLace.state();
    const secret = await getWhisperSecret(walletState.address);

    const contractInstance = new Contract({
        get_sender_secret_key: (context) => {
            return [context.privateState, secret] as any;
        }
    });

    return await (MidnightSetupAPI as any).joinContract(providers, contractInstance as any, address);
}

export async function deployMail(): Promise<any> {
    const providers = await setupProviders();
    const walletState = await (window as any).midnight.mnLace.state();
    const secret = await getWhisperSecret(walletState.address);

    const contractInstance = new Contract({
        get_sender_secret_key: (context) => {
            return [context.privateState, secret] as any;
        }
    });

    return await (MidnightSetupAPI as any).deployContract(providers, contractInstance as any);
}

export async function sendMessage(
    api: any,
    senderHandleHash: Uint8Array,
    recipientHandleHash: Uint8Array,
    messageCid: Uint8Array,
    senderOwnershipCommitment: Uint8Array
): Promise<string> {
    // Contract expects Bytes<64> for CID
    const paddedCid = new Uint8Array(64);
    paddedCid.set(messageCid);

    // Note: messageCid passed in should be the raw bytes of the CID string (e.g. 46 bytes),
    // not the 32-byte hash of it.

    const result = await api.send_message(
        senderHandleHash,
        recipientHandleHash,
        paddedCid,
        senderOwnershipCommitment
    );
    return result.txHash;
}
