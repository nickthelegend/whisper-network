/**
 * Utility for Whisper Network naming and identity
 */

export const getWhisperAddress = (address: string | undefined): string => {
    if (!address) return "anonymous.whisper.network";

    // Normalize and truncated address for naming
    const cleanAddress = address.trim();
    const prefix = cleanAddress.slice(0, 6).toLowerCase();
    const suffix = cleanAddress.slice(-4).toLowerCase();

    return `${prefix}${suffix}.whisper.network`;
};

export const getTruncatedAddress = (address: string | undefined): string => {
    if (!address) return "Not Connected";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
