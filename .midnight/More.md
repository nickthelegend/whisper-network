# Getting Started
URL: /midnight/midnight-setup/getting-started
# API Reference
URL: /midnight/midnight-setup/api

Complete reference for MidnightSetupAPI methods, types, and provider configuration

***

title: "API Reference"
description: "Complete reference for MidnightSetupAPI methods, types, and provider configuration"
-------------------------------------------------------------------------------------------------

This reference documents all methods, types, and configuration options available in the `@meshsdk/midnight-setup` package.

## MidnightSetupAPI

The main class for deploying and interacting with Midnight Network smart contracts.

### Static methods

#### deployContract

Deploys a new smart contract to the Midnight Network.

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import type { MidnightSetupContractProviders, ContractInstance } from '@meshsdk/midnight-setup';

const api = await MidnightSetupAPI.deployContract(
  providers: MidnightSetupContractProviders,
  contractInstance: ContractInstance,
  logger?: Logger
);
```

**Parameters**

| Parameter          | Type                             | Required | Description                               |
| ------------------ | -------------------------------- | -------- | ----------------------------------------- |
| `providers`        | `MidnightSetupContractProviders` | Yes      | Network and wallet provider configuration |
| `contractInstance` | `ContractInstance`               | Yes      | Your compiled contract instance           |
| `logger`           | `Logger`                         | No       | Optional Pino logger for debugging        |

**Returns**

`Promise<MidnightSetupAPI>` - An API instance connected to the deployed contract.

**Example**

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import { setupProviders } from './providers';
import { MyContract } from './managed/MyContract';

async function deploy() {
  const providers = await setupProviders();
  const contractInstance = new MyContract({});

  const api = await MidnightSetupAPI.deployContract(providers, contractInstance);

  console.log('Contract address:', api.deployedContractAddress);
  return api;
}
```

***

#### joinContract

Connects to an existing deployed contract.

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const api = await MidnightSetupAPI.joinContract(
  providers: MidnightSetupContractProviders,
  contractInstance: ContractInstance,
  contractAddress: string,
  logger?: Logger
);
```

**Parameters**

| Parameter          | Type                             | Required | Description                               |
| ------------------ | -------------------------------- | -------- | ----------------------------------------- |
| `providers`        | `MidnightSetupContractProviders` | Yes      | Network and wallet provider configuration |
| `contractInstance` | `ContractInstance`               | Yes      | Your compiled contract instance           |
| `contractAddress`  | `string`                         | Yes      | Address of the deployed contract          |
| `logger`           | `Logger`                         | No       | Optional Pino logger for debugging        |

**Returns**

`Promise<MidnightSetupAPI>` - An API instance connected to the existing contract.

**Example**

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import { setupProviders } from './providers';
import { MyContract } from './managed/MyContract';

async function join(address: string) {
  const providers = await setupProviders();
  const contractInstance = new MyContract({});

  const api = await MidnightSetupAPI.joinContract(
    providers,
    contractInstance,
    address
  );

  console.log('Connected to:', address);
  return api;
}
```

***

### Instance methods

#### getContractState

Retrieves the current state of the connected contract.

```typescript
const state = await api.getContractState();
```

**Returns**

`Promise<ContractStateData>` - The current contract state.

**Example**

```typescript
const state = await api.getContractState();
console.log('Contract data:', state.data);
console.log('Last updated:', state.timestamp);
```

***

#### getLedgerState

Retrieves and parses the current ledger state.

```typescript
const ledgerState = await api.getLedgerState();
```

**Returns**

`Promise<LedgerStateData>` - The parsed ledger state.

**Example**

```typescript
const ledgerState = await api.getLedgerState();
console.log('Message:', ledgerState.ledgerState?.message);
console.log('Block height:', ledgerState.blockHeight);
```

***

### Instance properties

#### deployedContractAddress

The address of the deployed contract (available after deployment or joining).

```typescript
const address: string = api.deployedContractAddress;
```

***

## Types

Import types for TypeScript projects:

```typescript
import type {
  ContractInstance,
  ContractStateData,
  DeployedContract,
  DeployedMidnightSetupAPI,
  LedgerStateData,
  MidnightSetupContractProviders,
} from '@meshsdk/midnight-setup';
```

### MidnightSetupContractProviders

Configuration object containing all required providers.

```typescript
interface MidnightSetupContractProviders {
  privateStateProvider: PrivateStateProvider;
  zkConfigProvider: ZkConfigProvider;
  proofProvider: ProofProvider;
  publicDataProvider: PublicDataProvider;
  walletProvider: WalletProvider;
  midnightProvider: MidnightProvider;
}
```

| Property               | Description                               |
| ---------------------- | ----------------------------------------- |
| `privateStateProvider` | Manages local private state storage       |
| `zkConfigProvider`     | Handles ZK circuit configuration fetching |
| `proofProvider`        | Generates zero-knowledge proofs           |
| `publicDataProvider`   | Queries public blockchain data            |
| `walletProvider`       | Integrates with Lace wallet for signing   |
| `midnightProvider`     | Submits transactions to the network       |

***

### ContractStateData

The structure returned by `getContractState()`.

```typescript
interface ContractStateData {
  data: unknown;
  timestamp: number;
  blockHeight: number;
}
```

***

### LedgerStateData

The structure returned by `getLedgerState()`.

```typescript
interface LedgerStateData {
  ledgerState: unknown;
  blockHeight: number;
  timestamp: number;
}
```

***

## Provider setup

Complete provider configuration example:

```typescript
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import type { MidnightSetupContractProviders } from "@meshsdk/midnight-setup";

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
  const wallet = window.midnight?.mnLace;
  if (!wallet) {
    throw new Error("Please install Lace Beta Wallet for Midnight Network");
  }

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

***

## Error handling

Wrap API calls in try-catch blocks for proper error handling:

```typescript
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

async function safeDeployment() {
  try {
    const providers = await setupProviders();
    const api = await MidnightSetupAPI.deployContract(providers, contractInstance);

    const state = await api.getContractState();
    return { success: true, api, state };
  } catch (error) {
    console.error('Deployment error:', error);

    if (error instanceof Error) {
      if (error.message.includes('Insufficient funds')) {
        return { success: false, error: 'Not enough funds in wallet' };
      }
      if (error.message.includes('Contract not found')) {
        return { success: false, error: 'Contract address is invalid' };
      }
    }

    return { success: false, error: 'An unexpected error occurred' };
  }
}
```

***

## Best practices

1. **Always handle errors** - Wrap all API calls in try-catch blocks
2. **Use TypeScript** - Import types for compile-time safety
3. **Validate inputs** - Check contract addresses and parameters before calling
4. **Monitor state changes** - Poll `getContractState()` or `getLedgerState()` for updates
5. **Test on testnet** - Always test thoroughly before mainnet deployment
6. **Log appropriately** - Pass a logger to deployment methods for debugging

***

## Troubleshooting

### "Contract not found" error

**Cause**: The contract address is invalid or the contract was not deployed.

**Solution**: Verify the address is correct and the contract exists on the network.

### "Insufficient funds" error

**Cause**: The wallet does not have enough tokens for the transaction.

**Solution**: Fund the wallet with testnet tokens and retry.

### Provider connection failures

**Cause**: Network services (indexer, prover) are unreachable.

**Solution**: Check `wallet.serviceUriConfig()` returns valid URIs and verify network connectivity.

***

## Next steps

* [Wallet Integration](/docs/midnight/midnight-setup/wallet) - Wallet connection details
* [Examples](/docs/midnight/midnight-setup/examples) - Complete code samples
* [Getting Started](/docs/midnight/midnight-setup/getting-started) - Initial setup guide




Install and configure @meshsdk/midnight-setup to build your first Midnight Network dApp

***

title: "Getting Started"
description: "Install and configure @meshsdk/midnight-setup to build your first Midnight Network dApp"
------------------------------------------------------------------------------------------------------

This guide walks you through installing the Midnight SDK, configuring providers, and deploying your first smart contract. By the end, you will have a working Midnight integration ready for development.

## Prerequisites

Before you start, ensure you have:

* **Node.js 18+** - [Download Node.js](https://nodejs.org/)
* **Lace Beta Wallet** - [Install from Chrome Web Store](https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg)
* A funded wallet on Midnight testnet

## Step 1: Install dependencies

Install the core package and required Midnight Network dependencies:

```bash
npm install @meshsdk/midnight-setup \
  @midnight-ntwrk/dapp-connector-api@3.0.0 \
  @midnight-ntwrk/midnight-js-fetch-zk-config-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-http-client-proof-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-indexer-public-data-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-level-private-state-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-network-id@2.0.2
```

## Step 2: Create the providers configuration

Create a `providers.ts` file that configures all the necessary providers for Midnight Network:

```typescript
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import type { MidnightSetupContractProviders } from "@meshsdk/midnight-setup";

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
  // Check for Lace wallet
  const wallet = window.midnight?.mnLace;
  if (!wallet) {
    throw new Error("Please install Lace Beta Wallet for Midnight Network");
  }

  // Connect to wallet and get configuration
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

## Step 3: Deploy a contract

Use `MidnightSetupAPI` to deploy your smart contract:

```typescript
import { MidnightSetupAPI } from "@meshsdk/midnight-setup";
import { setupProviders } from "./providers";

async function deployContract() {
  // Set up providers with wallet connection
  const providers = await setupProviders();

  // Create your contract instance
  const contractInstance = new MyContract({});

  // Deploy the contract
  const api = await MidnightSetupAPI.deployContract(
    providers,
    contractInstance,
  );

  console.log("Contract deployed at:", api.deployedContractAddress);
  return api;
}
```

## Step 4: Interact with the contract

Once deployed, you can read state and call contract methods:

```typescript
// Get contract state
const contractState = await api.getContractState();
console.log("Contract data:", contractState.data);

// Get ledger state
const ledgerState = await api.getLedgerState();
console.log("Ledger state:", ledgerState.ledgerState?.message);
```

## Step 5: Join an existing contract

To connect to an already-deployed contract:

```typescript
import { MidnightSetupAPI } from "@meshsdk/midnight-setup";
import { setupProviders } from "./providers";

async function joinContract(contractAddress: string) {
  const providers = await setupProviders();
  const contractInstance = new MyContract({});

  const api = await MidnightSetupAPI.joinContract(
    providers,
    contractInstance,
    contractAddress,
  );

  console.log("Connected to contract:", contractAddress);
  return api;
}
```

## Project structure

A typical Midnight dApp project looks like this:

```
my-midnight-dapp/
├── src/
│   ├── providers.ts       # Provider configuration
│   ├── contracts/         # Your Compact contracts
│   │   └── MyContract.compact
│   ├── managed/           # Compiled contract output
│   │   └── MyContract.ts
│   └── app.tsx            # Application entry point
├── package.json
└── tsconfig.json
```

## What the providers do

| Provider               | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `privateStateProvider` | Stores private state locally using LevelDB      |
| `zkConfigProvider`     | Fetches zero-knowledge circuit configurations   |
| `proofProvider`        | Generates ZK proofs via HTTP prover service     |
| `publicDataProvider`   | Queries public blockchain data from the indexer |
| `walletProvider`       | Signs and balances transactions via Lace wallet |
| `midnightProvider`     | Submits transactions to the Midnight Network    |

## Troubleshooting

### Wallet not detected

If you see "Please install Lace Beta Wallet":

1. Verify the Lace Beta extension is installed in your browser
2. Refresh the page after installation
3. Ensure the wallet is unlocked and connected to Midnight testnet

### Transaction failures

Common causes of transaction failures:

* **Insufficient funds**: Ensure your wallet has testnet tokens
* **Network issues**: Check that the prover and indexer services are reachable
* **Contract errors**: Review your contract logic and input parameters

### Provider connection errors

If providers fail to connect:

1. Check that `wallet.serviceUriConfig()` returns valid URIs
2. Verify your internet connection
3. Ensure the Midnight testnet services are operational

## Next steps

* [Wallet Integration](/docs/midnight/midnight-setup/wallet) - Deep dive into Lace wallet features
* [API Reference](/docs/midnight/midnight-setup/api) - Complete method documentation
* [Examples](/docs/midnight/midnight-setup/examples) - Full working code samples

## Related resources

* [Midnight Network Documentation](https://docs.midnight.network/)
* [GitHub Repository](https://github.com/MeshJS/midnight-setup)
* [Lace Beta Wallet](https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg)
# Examples
URL: /midnight/midnight-setup/examples

Complete working examples for Midnight Network integration with React

***

title: "Examples"
description: "Complete working examples for Midnight Network integration with React"
------------------------------------------------------------------------------------

This page provides complete, copy-paste-ready examples for common Midnight Network integration patterns. Each example includes all necessary imports and can be used as a starting point for your application.

## Full React application

A complete React application demonstrating wallet connection, contract deployment, and state management.

### Project setup

First, install all required dependencies:

```bash
npm install @meshsdk/midnight-setup \
  @midnight-ntwrk/dapp-connector-api@3.0.0 \
  @midnight-ntwrk/midnight-js-fetch-zk-config-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-http-client-proof-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-indexer-public-data-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-level-private-state-provider@2.0.2 \
  @midnight-ntwrk/midnight-js-network-id@2.0.2
```

### Provider configuration

Create `src/providers.ts`:

```typescript
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import type { MidnightSetupContractProviders } from "@meshsdk/midnight-setup";

export async function setupProviders(): Promise<MidnightSetupContractProviders> {
  const wallet = window.midnight?.mnLace;
  if (!wallet) {
    throw new Error("Please install Lace Beta Wallet for Midnight Network");
  }

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

### Wallet hook

Create `src/hooks/useMidnightWallet.ts`:

```typescript
import { useState, useCallback } from 'react';

interface WalletState {
  address: string;
  coinPublicKey: string;
  encryptionPublicKey: string;
}

interface WalletHookReturn {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  walletState: WalletState | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useMidnightWallet(): WalletHookReturn {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const wallet = window.midnight?.mnLace;
      if (!wallet) {
        throw new Error("Please install Lace Beta Wallet for Midnight Network");
      }

      const walletAPI = await wallet.enable();
      const state = await walletAPI.state();

      setWalletState({
        address: state.address,
        coinPublicKey: state.coinPublicKey,
        encryptionPublicKey: state.encryptionPublicKey,
      });
      setIsConnected(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connection failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      const wallet = window.midnight?.mnLace;
      if (wallet) {
        await wallet.disconnect();
        setWalletState(null);
        setIsConnected(false);
        setError(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Disconnect failed";
      setError(message);
    }
  }, []);

  return {
    connectWallet,
    disconnectWallet,
    walletState,
    isConnected,
    isLoading,
    error,
  };
}
```

### Contract hook

Create `src/hooks/useMidnightContract.ts`:

```typescript
import { useState, useCallback } from 'react';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';
import { setupProviders } from '../providers';

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
```

### Main application component

Create `src/App.tsx`:

```typescript
import React, { useState } from 'react';
import { useMidnightWallet } from './hooks/useMidnightWallet';
import { useMidnightContract } from './hooks/useMidnightContract';

function App() {
  const {
    connectWallet,
    disconnectWallet,
    walletState,
    isConnected,
    isLoading: walletLoading,
    error: walletError,
  } = useMidnightWallet();

  const {
    api,
    deployContract,
    joinContract,
    getContractState,
    isLoading: contractLoading,
    error: contractError,
  } = useMidnightContract();

  const [contractAddress, setContractAddress] = useState('');
  const [contractState, setContractState] = useState<unknown>(null);

  const isLoading = walletLoading || contractLoading;
  const error = walletError || contractError;

  async function handleDeploy() {
    try {
      // Replace with your actual contract class
      const contractInstance = {}; // new MyContract({})
      const newApi = await deployContract(contractInstance);
      console.log('Deployed at:', newApi.deployedContractAddress);
    } catch (err) {
      console.error('Deploy failed:', err);
    }
  }

  async function handleJoin() {
    if (!contractAddress.trim()) {
      alert('Please enter a contract address');
      return;
    }

    try {
      // Replace with your actual contract class
      const contractInstance = {}; // new MyContract({})
      await joinContract(contractInstance, contractAddress);
      console.log('Joined contract:', contractAddress);
    } catch (err) {
      console.error('Join failed:', err);
    }
  }

  async function handleGetState() {
    try {
      const state = await getContractState();
      setContractState(state);
    } catch (err) {
      console.error('Get state failed:', err);
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Midnight Network dApp</h1>

      {error && (
        <div style={{ padding: '1rem', background: '#fee', color: '#c00', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <section style={{ marginBottom: '2rem' }}>
        <h2>Step 1: Connect Wallet</h2>
        {isConnected ? (
          <div>
            <p>Connected: {walletState?.address}</p>
            <button onClick={disconnectWallet}>Disconnect</button>
          </div>
        ) : (
          <button onClick={connectWallet} disabled={isLoading}>
            {walletLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Step 2: Deploy or Join Contract</h2>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={handleDeploy} disabled={!isConnected || isLoading}>
            {contractLoading ? 'Deploying...' : 'Deploy New Contract'}
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem', width: '300px' }}
          />
          <button onClick={handleJoin} disabled={!isConnected || isLoading}>
            Join Contract
          </button>
        </div>
        {api && (
          <p style={{ marginTop: '0.5rem', color: 'green' }}>
            Connected to: {api.deployedContractAddress}
          </p>
        )}
      </section>

      {api && (
        <section style={{ marginBottom: '2rem' }}>
          <h2>Step 3: Read Contract State</h2>
          <button onClick={handleGetState} disabled={isLoading}>
            Get Contract State
          </button>
          {contractState && (
            <pre style={{ background: '#f5f5f5', padding: '1rem', marginTop: '1rem' }}>
              {JSON.stringify(contractState, null, 2)}
            </pre>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
```

***

## Error boundary component

Wrap your application with an error boundary for graceful error handling:

```typescript
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class MidnightErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Midnight Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in index.tsx
import { MidnightErrorBoundary } from './components/ErrorBoundary';
import App from './App';

ReactDOM.render(
  <MidnightErrorBoundary>
    <App />
  </MidnightErrorBoundary>,
  document.getElementById('root')
);
```

***

## Error handling utilities

Create reusable error handling functions:

```typescript
// src/utils/errors.ts

export function handleMidnightError(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes('install lace beta wallet')) {
    return 'Please install the Lace Beta Wallet browser extension';
  }

  if (message.includes('user rejected')) {
    return 'You rejected the request. Please try again.';
  }

  if (message.includes('insufficient funds')) {
    return 'Your wallet does not have enough funds';
  }

  if (message.includes('contract not found')) {
    return 'The contract address is invalid or does not exist';
  }

  if (message.includes('network')) {
    return 'Network error. Please check your connection.';
  }

  return 'An unexpected error occurred. Please try again.';
}

export function isWalletInstalled(): boolean {
  return typeof window !== 'undefined' && !!window.midnight?.mnLace;
}

export function formatAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
```

***

## TypeScript type declarations

Add type declarations for the Midnight wallet global:

```typescript
// src/types/midnight.d.ts

interface MidnightWalletAPI {
  state(): Promise<{
    address: string;
    coinPublicKey: string;
    encryptionPublicKey: string;
  }>;
  balanceAndProveTransaction(tx: unknown, newCoins: unknown): Promise<unknown>;
  submitTransaction(tx: unknown): Promise<unknown>;
}

interface MidnightWallet {
  enable(): Promise<MidnightWalletAPI>;
  disconnect(): Promise<void>;
  serviceUriConfig(): Promise<{
    indexerUri: string;
    indexerWsUri: string;
    proverServerUri: string;
  }>;
}

interface Midnight {
  mnLace?: MidnightWallet;
}

declare global {
  interface Window {
    midnight?: Midnight;
  }
}

export {};
```

***

## Troubleshooting

### Common issues and solutions

| Issue               | Cause                   | Solution                                      |
| ------------------- | ----------------------- | --------------------------------------------- |
| Wallet not detected | Extension not installed | Install Lace Beta Wallet and refresh          |
| Connection rejected | User denied request     | Retry and explain why wallet access is needed |
| Deployment fails    | Insufficient funds      | Fund wallet with testnet tokens               |
| Contract not found  | Invalid address         | Verify the contract address is correct        |
| Network errors      | Service unavailable     | Check internet connection and retry           |

### Debug logging

Enable detailed logging during development:

```typescript
import pino from 'pino';

const logger = pino({ level: 'debug' });

const api = await MidnightSetupAPI.deployContract(
  providers,
  contractInstance,
  logger // Pass logger for debug output
);
```

***

## Next steps

* [API Reference](/docs/midnight/midnight-setup/api) - Complete method documentation
* [Wallet Integration](/docs/midnight/midnight-setup/wallet) - Advanced wallet features
* [Getting Started](/docs/midnight/midnight-setup/getting-started) - Initial setup guide

## Related resources

* [GitHub Repository](https://github.com/MeshJS/midnight-setup) - Source code and more examples
* [Midnight Network Documentation](https://docs.midnight.network/)
* [Lace Beta Wallet](https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg)

# Midnight Contracts Wizard
URL: /midnight/midnight-contracts-wizard

Generate production-ready Midnight smart contract projects with zero-knowledge privacy

***

title: "Midnight Contracts Wizard"
description: "Generate production-ready Midnight smart contract projects with zero-knowledge privacy"
icon: SparklesIcon
------------------

import { linksMidnightContractsWizard } from "@/data/links-midnight";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

The Midnight Contracts Wizard is a CLI tool that generates complete smart contract projects for the Midnight Network. Select from pre-built contract templates with zero-knowledge privacy built in, and get a fully configured TypeScript project ready for development.

## Why use the Contracts Wizard?

| Benefit                        | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| **Production-ready templates** | Battle-tested contracts with ZK circuits included           |
| **Zero configuration**         | Generates complete project structure with all dependencies  |
| **Privacy by default**         | All contracts use zero-knowledge proofs for confidentiality |
| **TypeScript support**         | Full type definitions and compiled interfaces included      |

## Available contracts

| Contract         | ZK Circuits | Use case                                     |
| ---------------- | ----------- | -------------------------------------------- |
| **Tokenization** | 7           | Asset tokenization, fundraising, securities  |
| **Staking**      | 8           | Rewards, governance, yield generation        |
| **Identity**     | 1           | KYC, credential verification, access control |
| **Oracle**       | 7           | Price feeds, external data, IoT streams      |
| **Lending**      | 7           | DeFi protocols, collateralized loans         |

## Quick start

Run the wizard with npx (no installation required):

```bash
npx @meshsdk/midnight-contracts-wizard
```

Follow the interactive prompts to select your contracts and generate your project.

## Example output

```bash
$ npx @meshsdk/midnight-contracts-wizard

Welcome to Midnight Contracts Wizard!
? Enter your project name: my-defi-app
? Select contracts to include:
  [x] Tokenization Contract (7 ZK circuits)
  [x] Lending & Borrowing Contract (7 ZK circuits)

Creating project structure...
Adding Tokenization contract...
Adding Lending contract...

Project created successfully!

Next steps:
1. cd my-defi-app
2. npm install
3. compact compile src/tokenization/token.compact src/managed/tokenization
```

## Documentation sections

<div className="grid md:grid-cols-2 gap-6 items-stretch">
  {linksMidnightContractsWizard.map((card) => (
      <Link key={card.title} href={card.link} className="no-underline">
        <Card className="h-full text-center hover:border-primary/50 transition-colors px-4 py-8">
          <CardTitle className="font-heading">{card.title}</CardTitle>
          <CardDescription>{card.desc}</CardDescription>
        </Card>
      </Link>
    ))}
</div>

## Requirements

Before you start, ensure you have:

* **Node.js 18+** - [Download Node.js](https://nodejs.org/)
* **npm 8+** - Included with Node.js (provides npx)

## Next steps

1. [Installation](/docs/midnight/midnight-contracts-wizard/installation) - Get the CLI tool running
2. [Usage](/docs/midnight/midnight-contracts-wizard/usage) - Create your first project
3. [Contracts](/docs/midnight/midnight-contracts-wizard/contracts) - Explore available templates
4. [Project Structure](/docs/midnight/midnight-contracts-wizard/project-structure) - Understand generated files

## Related resources

* [Midnight Setup](/docs/midnight/midnight-setup) - Connect contracts to your dApp
* [Midnight Network Documentation](https://docs.midnight.network/)
* [Compact Language Guide](https://docs.midnight.network/develop/tutorial/compact)



# Installation
URL: /midnight/midnight-contracts-wizard/installation

Run the Midnight Contracts Wizard CLI to generate smart contract projects

***

title: "Installation"
description: "Run the Midnight Contracts Wizard CLI to generate smart contract projects"
----------------------------------------------------------------------------------------

The Midnight Contracts Wizard runs directly via npx, so you do not need to install anything globally. This guide covers all the ways to run the wizard and verify your environment.

## Quick start

Run the wizard immediately with npx:

```bash
npx @meshsdk/midnight-contracts-wizard
```

This command:

1. Downloads the latest version automatically
2. Launches the interactive wizard
3. Generates your project with selected contracts

## Prerequisites

Before running the wizard, verify you have the required tools installed.

### Check Node.js version

```bash
node --version
```

You need Node.js 18 or higher. If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/).

### Check npm version

```bash
npm --version
```

You need npm 8 or higher (includes npx). npm is included with Node.js, so updating Node.js will also update npm.

## Running the wizard

### Basic usage

```bash
npx @meshsdk/midnight-contracts-wizard
```

### Check available version

```bash
npx @meshsdk/midnight-contracts-wizard --version
```

### Display help

```bash
npx @meshsdk/midnight-contracts-wizard --help
```

## What happens when you run npx

When you execute the npx command:

1. **Downloads package** - npx fetches the latest version from npm registry
2. **Runs wizard** - Launches the interactive CLI interface
3. **Creates project** - Generates files based on your selections
4. **Cleans up** - The package is not permanently installed

## Troubleshooting

### "npx: command not found"

**Cause**: npm is not installed or not in your PATH.

**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/), which includes npm and npx.

### "Node.js version too old"

**Cause**: You have Node.js \< 18 installed.

**Solution**: Update Node.js using your preferred method:

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download directly from nodejs.org
```

### Slow download

**Cause**: First-time download or npm cache cleared.

**Solution**: Wait for the download to complete. Subsequent runs use the npm cache and are faster.

### Permission errors

**Cause**: npm directory permissions issue.

**Solution**: Fix npm permissions:

```bash
# Create npm directory in home folder
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH=~/.npm-global/bin:$PATH
```

## Verifying installation

After running the wizard, verify the generated project:

```bash
# Navigate to your project
cd my-project

# Check the files were created
ls -la

# Verify package.json exists
cat package.json
```

You should see:

* `package.json` with project configuration
* `src/` directory with contract files
* `tsconfig.json` for TypeScript configuration

## Next steps

Now that you can run the wizard:

* [Usage](/docs/midnight/midnight-contracts-wizard/usage) - Create your first project
* [Contracts](/docs/midnight/midnight-contracts-wizard/contracts) - Learn about available templates
* [Project Structure](/docs/midnight/midnight-contracts-wizard/project-structure) - Understand generated files

## Related resources

* [Node.js Downloads](https://nodejs.org/)
* [npm Documentation](https://docs.npmjs.com/)
* [Midnight Network Documentation](https://docs.midnight.network/)



# Available Contracts
URL: /midnight/midnight-contracts-wizard/contracts

Explore the zero-knowledge smart contract templates in the Midnight Contracts Wizard

***

title: "Available Contracts"
description: "Explore the zero-knowledge smart contract templates in the Midnight Contracts Wizard"
---------------------------------------------------------------------------------------------------

The Midnight Contracts Wizard includes five production-ready smart contract templates. Each template provides complete functionality with privacy-preserving zero-knowledge circuits built in.

## Contract overview

| Contract     | ZK Circuits | Primary use case                        |
| ------------ | ----------- | --------------------------------------- |
| Tokenization | 7           | Asset tokenization, private investments |
| Staking      | 8           | Rewards, governance participation       |
| Identity     | 1           | Credential verification, access control |
| Oracle       | 7           | External data feeds, price oracles      |
| Lending      | 7           | DeFi protocols, collateralized loans    |

***

## Tokenization Contract

**7 ZK Circuits**

A complete asset tokenization system with zero-knowledge privacy for investments and ownership tracking.

### Features

| Feature               | Description                                      |
| --------------------- | ------------------------------------------------ |
| Private minting       | Create tokens without revealing amounts          |
| Confidential balances | Hide holder balances from public view            |
| Private transfers     | Move tokens without exposing transaction details |
| Investment tracking   | Track investments with ZK proofs                 |

### Use cases

* **Real estate tokenization** - Fractional property ownership with private holdings
* **Securities issuance** - Confidential cap table management
* **Private equity** - Track investments without public disclosure
* **Fundraising** - Accept contributions with privacy guarantees

### Example usage

```typescript
import { TokenizationContract } from './managed/tokenization';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new TokenizationContract({
  name: "Property Token",
  symbol: "PROP",
  totalSupply: 1000000
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

***

## Staking Contract

**8 ZK Circuits**

A privacy-focused staking system with configurable rewards and lock periods.

### Features

| Feature               | Description                              |
| --------------------- | ---------------------------------------- |
| Private stake amounts | Hide how much each user stakes           |
| Confidential rewards  | Distribute rewards privately             |
| Flexible lock periods | Configure custom staking durations       |
| Slashing mechanisms   | Penalize bad actors with ZK verification |

### Use cases

* **Network validation** - Stake to participate in consensus
* **Governance** - Voting power based on private stake
* **Yield generation** - Earn rewards on locked assets
* **Long-term incentives** - Reward committed participants

### Example usage

```typescript
import { StakingContract } from './managed/staking';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new StakingContract({
  rewardRate: 0.05, // 5% annual
  lockPeriod: 30 * 24 * 60 * 60 // 30 days in seconds
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

***

## Identity Contract

**1 ZK Circuit**

A complete identity management system for privacy-preserving credential verification.

### Features

| Feature                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| Zero-knowledge proofs   | Prove attributes without revealing data        |
| Selective disclosure    | Share only what you choose                     |
| Credential verification | Validate credentials privately                 |
| Access control          | Grant permissions based on verified attributes |

### Use cases

* **KYC compliance** - Verify identity without storing personal data
* **Age verification** - Prove age without revealing birthdate
* **Credential validation** - Check qualifications privately
* **Gated access** - Control access based on verified attributes

### Example usage

```typescript
import { IdentityContract } from './managed/identity';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new IdentityContract({
  issuer: "trusted-issuer-address",
  requiredAttributes: ["over18", "verified"]
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

***

## Oracle Contract

**7 ZK Circuits**

A decentralized oracle system with privacy-preserving data feeds.

### Features

| Feature                     | Description                                   |
| --------------------------- | --------------------------------------------- |
| Confidential data ingestion | Ingest data without public exposure           |
| Multi-source aggregation    | Combine data from multiple sources            |
| Tamper-proof feeds          | Ensure data integrity with ZK proofs          |
| Private validation          | Verify data quality without revealing sources |

### Use cases

* **Price feeds** - Private asset pricing for DeFi
* **Weather data** - Confidential environmental data
* **Sports results** - Private outcome verification
* **IoT streams** - Secure sensor data ingestion

### Example usage

```typescript
import { OracleContract } from './managed/oracle';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new OracleContract({
  feedId: "BTC-USD",
  updateInterval: 60, // seconds
  minSources: 3
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

***

## Lending Contract

**7 ZK Circuits**

A privacy-preserving decentralized lending protocol.

### Features

| Feature                 | Description                             |
| ----------------------- | --------------------------------------- |
| Confidential collateral | Hide collateral amounts                 |
| Private loan amounts    | Keep borrowed amounts private           |
| Interest rate privacy   | Calculate interest without exposure     |
| ZK liquidation          | Verify liquidation conditions privately |

### Use cases

* **DeFi lending platforms** - Build private lending pools
* **Peer-to-peer lending** - Connect lenders and borrowers privately
* **Collateralized loans** - Secure loans with hidden collateral
* **Credit lines** - Establish private credit facilities

### Example usage

```typescript
import { LendingContract } from './managed/lending';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new LendingContract({
  collateralRatio: 150, // 150% collateralization
  interestRate: 0.08, // 8% annual
  liquidationThreshold: 120 // liquidate at 120%
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

***

## Combining contracts

You can select multiple contracts to build comprehensive applications.

### DeFi platform example

Combine Tokenization + Oracle + Lending for a complete DeFi platform:

```bash
npx @meshsdk/midnight-contracts-wizard

? Select contracts to include:
  [x] Tokenization Contract
  [x] Oracle Contract
  [x] Lending & Borrowing Contract
```

This combination enables:

* Issue tokens representing assets
* Get real-time price feeds
* Enable collateralized borrowing

### Governance example

Combine Staking + Identity for verified governance:

```bash
npx @meshsdk/midnight-contracts-wizard

? Select contracts to include:
  [x] Staking Contract
  [x] Identity Contracts
```

This combination enables:

* Stake tokens for voting power
* Verify voter eligibility
* Private vote counting

***

## Technical details

Each contract template includes:

| Component             | Description                            |
| --------------------- | -------------------------------------- |
| `.compact` source     | Complete Compact contract code         |
| ZK circuits           | Pre-configured zero-knowledge circuits |
| TypeScript interfaces | Type definitions for integration       |
| Build scripts         | Compilation and deployment helpers     |

## Next steps

* [Project Structure](/docs/midnight/midnight-contracts-wizard/project-structure) - Understand generated files
* [Midnight Setup](/docs/midnight/midnight-setup) - Deploy contracts to the network
* [Usage](/docs/midnight/midnight-contracts-wizard/usage) - Generate your project

## Related resources

* [Compact Language Guide](https://docs.midnight.network/develop/tutorial/compact)
* [Midnight Network Documentation](https://docs.midnight.network/)

# Project Structure
URL: /midnight/midnight-contracts-wizard/project-structure

Understand the files and directories generated by the Midnight Contracts Wizard

***

title: "Project Structure"
description: "Understand the files and directories generated by the Midnight Contracts Wizard"
----------------------------------------------------------------------------------------------

When you create a project with the Midnight Contracts Wizard, it generates a complete directory structure with all necessary configuration files. This guide explains each component and how to work with it.

## Directory overview

```
my-project/
├── src/
│   ├── tokenization/        # Contract source (if selected)
│   │   └── token.compact
│   ├── staking/             # Contract source (if selected)
│   │   └── staking.compact
│   ├── identity/            # Contract source (if selected)
│   │   └── identity.compact
│   ├── oracle/              # Contract source (if selected)
│   │   └── oracle.compact
│   ├── lending/             # Contract source (if selected)
│   │   └── lending.compact
│   └── managed/             # Compiled output (auto-generated)
│       └── *.ts
├── dist/                    # Build output
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.build.json      # Production build config
└── README.md                # Project documentation
```

## Source directory (`src/`)

The `src/` directory contains your contract source files and compiled output.

### Contract directories

Each selected contract gets its own directory with `.compact` source files:

```
src/
├── tokenization/
│   └── token.compact       # Tokenization contract source
├── identity/
│   └── identity.compact    # Identity contract source
└── lending/
    └── lending.compact     # Lending contract source
```

### Managed directory (`src/managed/`)

The `managed/` directory contains compiled TypeScript files generated from your `.compact` contracts.

```
src/managed/
├── tokenization.ts         # Compiled tokenization contract
├── identity.ts             # Compiled identity contract
└── lending.ts              # Compiled lending contract
```

**Important:** Do not edit files in `src/managed/` manually. They are regenerated each time you compile your contracts.

## Configuration files

### package.json

Contains project metadata, dependencies, and build scripts:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "compile": "compact-cli compile src/**/*.compact",
    "clean": "rm -rf dist src/managed"
  },
  "dependencies": {
    "@midnight-ntwrk/compact-runtime": "^0.8.1",
    "@midnight-ntwrk/midnight-js-types": "^2.0.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

| Script            | Purpose                                 |
| ----------------- | --------------------------------------- |
| `npm run build`   | Compile TypeScript to JavaScript        |
| `npm run compile` | Compile Compact contracts to TypeScript |
| `npm run clean`   | Remove generated files                  |

### tsconfig.json

Main TypeScript configuration for development:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### tsconfig.build.json

Extended configuration for production builds:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

## Build output (`dist/`)

After running `npm run build`, compiled JavaScript and type definitions appear in `dist/`:

```
dist/
├── tokenization.js         # Compiled JavaScript
├── tokenization.d.ts       # Type definitions
├── identity.js
├── identity.d.ts
└── ...
```

## Contract source files

### Compact file structure

Each `.compact` file contains the contract definition and ZK circuits:

```text
// Example: src/tokenization/token.compact

contract Token {
  // State variables
  ledger balances: Map<Address, Secret<u64>>;

  // ZK circuits
  circuit mint(amount: Secret<u64>) -> Public<bool> {
    // Minting logic with ZK proof
  }

  circuit transfer(to: Address, amount: Secret<u64>) -> Public<bool> {
    // Transfer logic with ZK proof
  }

  // Additional circuits...
}
```

### Understanding circuits

Each circuit in the contract corresponds to a ZK proof:

| Circuit    | Purpose                                                |
| ---------- | ------------------------------------------------------ |
| `mint`     | Create new tokens with hidden amount                   |
| `transfer` | Move tokens with hidden sender/amount                  |
| `burn`     | Destroy tokens with hidden amount                      |
| `balance`  | Prove balance threshold without revealing exact amount |

## Working with the project

### Modify contracts

1. Edit `.compact` files in `src/[contract]/`
2. Recompile with `npm run compile`
3. Build with `npm run build`

### Add new contracts

1. Create a new directory in `src/`
2. Add your `.compact` file
3. Compile and build

### Integrate with your dApp

Import compiled contracts in your application:

```typescript
import { TokenizationContract } from './managed/tokenization';
import { MidnightSetupAPI } from '@meshsdk/midnight-setup';

const contract = new TokenizationContract({
  // Contract configuration
});

const api = await MidnightSetupAPI.deployContract(providers, contract);
```

## Troubleshooting

### Missing managed files

**Problem**: `src/managed/` is empty or missing files.

**Solution**: Run the Compact compiler:

```bash
npm run compile
```

### TypeScript errors in managed files

**Problem**: Type errors in `src/managed/*.ts`.

**Solution**:

1. Delete `src/managed/`
2. Recompile contracts: `npm run compile`
3. Ensure Compact compiler version matches dependencies

### Build fails

**Problem**: `npm run build` fails with errors.

**Solutions**:

1. Run `npm install` to ensure dependencies are installed
2. Check that `src/managed/` contains compiled contracts
3. Verify `tsconfig.json` is valid JSON

## Next steps

* [Contracts](/docs/midnight/midnight-contracts-wizard/contracts) - Learn about each contract template
* [Midnight Setup](/docs/midnight/midnight-setup) - Deploy contracts to the network
* [API Reference](/docs/midnight/midnight-setup/api) - Integrate with your dApp

## Related resources

* [Compact Language Guide](https://docs.midnight.network/develop/tutorial/compact)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/)
* [Midnight Network Documentation](https://docs.midnight.network/)

