import { setupProviders } from "./providers";
import { MidnightSetupAPI } from "@meshsdk/midnight-setup";
import { WhisperDNSContract } from "@/managed/whisper_dns";

export interface WhisperMessage {
    id: string;
    from: string;
    subject: string;
    body: string;
    timestamp: number;
    isRead: boolean;
    isEncrypted: boolean;
}

export const fetchRealMessages = async (whisperAddress: string): Promise<WhisperMessage[]> => {
    console.log(`[Mailbox] Initializing Secure Sync for ${whisperAddress}...`);

    try {
        const { joinMail, getMessageCount, fetchInboxMessages } = await import("./contracts/mail");
        const { fetchFromIPFS } = await import("./ipfs");
        const EthCrypto = await import("eth-crypto");

        // 1. Join Mail Contract
        const MAIL_ADDRESS = localStorage.getItem("whisper_mail_address") || "0000000000000000000000000000000000000000000000000000000000000002";
        const mailApi = await joinMail(MAIL_ADDRESS);

        // 2. Derive Handle Hash
        const handle = whisperAddress.replace(".whisper.network", "").replace(".whisper.night", ""); // handle cleanup
        const handleBytes = new TextEncoder().encode(handle);
        const handleHash = new Uint8Array(await crypto.subtle.digest('SHA-256', handleBytes));

        // 3. Get message count
        const count = await getMessageCount(mailApi, handleHash);
        console.log(`[Mailbox] Found ${count} messages on standard ledger.`);

        if (count === 0) return [];

        // 4. Fetch CIDs for last N messages
        const cidArrays = await fetchInboxMessages(mailApi, handleHash, count);

        // 5. Retrieve Private Key
        // Assuming it was stored during registration as `whisper_priv_${handle}`
        const privateKey = localStorage.getItem(`whisper_priv_${handle}`);
        if (!privateKey) {
            console.warn("[Mailbox] No private key found for decryption. Messages will be unreadable.");
        }

        const messages: WhisperMessage[] = [];

        for (const cidBytes of cidArrays) {
            try {
                // Remove padding (trailing zeros) if any, or convert fixed 64 bytes to utf8 string
                // Note: The CID was updated to IPFS as a string, then encoded to bytes. 
                // We need to decode the bytes back to string to get the CID.
                // Assuming trailing zeros are 0x00
                const validBytes = cidBytes.filter((b: number) => b !== 0);
                const cid = new TextDecoder().decode(validBytes);

                console.log(`[Mailbox] Fetching payload from IPFS: ${cid}`);
                const payload = await fetchFromIPFS(cid); // This returns the encrypted JSON object

                // 6. Decrypt
                let decryptedBody = "Check your private key.";
                let decryptedSubject = "Encrypted Message";

                if (privateKey && payload && payload.encryptedPayload) {
                    // If we saved as { ciphertext, iv, mac } stringified?
                    // In compose we did: EthCrypto.encryptWithPublicKey(...) => returns object { iv, ephemPublicKey, ciphertext, mac }
                    // Then we stringified it.
                    const encryptedObject = EthCrypto.cipher.parse(payload.payload || payload); // Adjust based on how we saved it

                    const decryptedString = await EthCrypto.decryptWithPrivateKey(
                        privateKey,
                        encryptedObject
                    );

                    const msgData = JSON.parse(decryptedString);
                    decryptedBody = msgData.body;
                    decryptedSubject = msgData.subject;
                }

                messages.push({
                    id: cid,
                    from: payload.from || "Unknown",
                    subject: decryptedSubject,
                    body: decryptedBody,
                    timestamp: payload.timestamp || Date.now(),
                    isRead: false,
                    isEncrypted: true
                });

            } catch (err) {
                console.error("Error processing message:", err);
            }
        }

        return messages;

    } catch (error) {
        console.error("[Mailbox] Sync failed:", error);
        return [];
    }
};
