# Midnight Network Development Knowledge Base

## Wallet Integration (Mesh SDK / Lace Beta)

The Lace Beta Wallet is the primary wallet for Midnight Network.

### Quick Start Connection
```typescript
// Check if Lace wallet is available
const wallet = window.midnight?.mnLace;
if (!wallet) {
  throw new Error("Please install Lace Beta Wallet for Midnight Network");
}

// Enable the wallet and get API
const walletAPI = await wallet.enable(); // or connect('undeployed') for v4

// Get wallet state and service URIs
const walletState = await walletAPI.state();
const uris = await wallet.serviceUriConfig();
```

### Core Wallet Methods
| Method | When to use |
| --- | --- |
| `wallet.enable()` | (v3) Connect to the wallet |
| `wallet.connect(net)` | (v4) Connect to the wallet (e.g., 'mainnet', 'undeployed') |
| `wallet.isEnabled()` | Check if the DApp is already authorized |
| `walletAPI.state()` | Retrieve current address, keys, and balance |
| `wallet.serviceUriConfig()` | Get network service URLs (indexer, prover) |
| `wallet.disconnect()` | End the wallet session |

### Persistence (Auto-reconnect)
For Lace 4.0.0+, where `isEnabled()` may be missing, we use a `localStorage` hint to trigger the SDK connection on mount:
```typescript
useEffect(() => {
    const check = async () => {
        const wallet = window.midnight?.mnLace;
        const shouldConnect = localStorage.getItem('midnight_wallet_connected') === 'true';
        if (wallet && shouldConnect) {
            await connectWallet(true); // Attempt silent reconnect
        }
    }
    setTimeout(check, 800);
}, [connectWallet]);
```
*Note: The localStorage flag serves as a hint to call the SDK's connect method.*

### Provider Configuration (Mesh SDK)
```typescript
export async function setupProviders(): Promise<MidnightSetupContractProviders> {
  const wallet = window.midnight?.mnLace;
  const walletAPI = await wallet.enable();
  const walletState = await walletAPI.state();
  const uris = await wallet.serviceUriConfig();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: "my-dapp-state",
    }),
    zkConfigProvider: new FetchZkConfigProvider(
      window.location.origin,
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
      balanceTx: (tx, newCoins) => {
        return walletAPI.balanceAndProveTransaction(tx, newCoins);
      },
    },
    midnightProvider: {
      submitTx: (tx) => {
        return walletAPI.submitTransaction(tx);
      },
    },
  };
}
```

### Handling v4 API Differences
If `walletAPI.state()` or `wallet.serviceUriConfig()` are missing, use these fallbacks:
- `walletAPI.getShieldedAddresses()` instead of `state()`
- `walletAPI.getConfiguration()` instead of `serviceUriConfig()`

### Troubleshooting
- **Wallet not detected**: Ensure Lace Beta is installed and the page is refreshed.
- **Network ID mismatch**: Ensure you pass the correct network ID to `connect()`.
- **Address not showing**: Ensure you are extracting the address from the correct property (shielded vs unshielded).

## Project Structure
- `hooks/useMidnightWallet.ts`: Unified hook for connection and state.
- `hooks/useMidnightContract.ts`: Hook for deploying and joining contracts.
- `lib/providers.ts`: Centralized provider configuration.
- `.midnight/KNOWLEDGE.md`: This knowledge base.
