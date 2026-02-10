import type { DAppConnectorAPI } from "@midnight-ntwrk/dapp-connector-api";

let api: DAppConnectorAPI | null = null;

// Connect to installed Midnight wallet (Lace usually)
export async function connectMidnight(): Promise<DAppConnectorAPI> {
  if (typeof window === "undefined" || !window.midnight) {
    throw new Error("No Midnight wallet detected");
  }

  const wallets = Object.keys(window.midnight);
  if (wallets.length === 0) {
    throw new Error("No wallets available");
  }

  const walletName = wallets[0]; // e.g. 'lace'
  api = await window.midnight[walletName].enable();
  return api;
}

// Get already connected instance
export function getMidnight(): DAppConnectorAPI {
  if (!api) {
    throw new Error("Wallet not connected");
  }
  return api;
}

// Fetch wallet state
export async function getWalletState() {
  const connector = getMidnight();
  return await connector.state();
}

// Submit transaction (raw signed bytes)
export async function submitTx(tx: string) {
  const connector = getMidnight();
  return await connector.submitTx(tx);
}

// Sign tx
// Note: Midnight connector API signature might vary slightly, but this is the general pattern
export async function signTx(tx: string, partial: boolean = false) {
  const connector = getMidnight();
  // Using 'signTx' if available, or whatever the specific API method is
  // The provided snippet used signTx(tx)
  // We'll trust the snippet but wrap in try-catch if needed
  // Based on doc: connector.signTx(tx, partial)
  return await connector.signTx(tx, partial);
}
