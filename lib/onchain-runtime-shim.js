/**
 * Synchronous shim for @midnight-ntwrk/onchain-runtime
 * This fixes the 'ocrt.maxField is not a function' error caused by
 * @midnight-ntwrk/compact-runtime's attempt to require() an async WASM module.
 */

// Constant values for Midnight's scalar field and dummy address
const MAX_FIELD_VAL = BigInt("52435875175126190479447740508185965837690552500527637822603658699938581184512");
const DUMMY_ADDRESS_VAL = "02000000000000000000000000000000000000000000000000000000000000000000";

export const maxField = () => MAX_FIELD_VAL;
export const dummyContractAddress = () => DUMMY_ADDRESS_VAL;

// Lazy load the real module for subsequent calls
let realModule = null;
if (typeof window !== 'undefined') {
    // We import from the real file to bypass the Webpack alias
    import("../node_modules/@midnight-ntwrk/onchain-runtime/midnight_onchain_runtime_wasm.js").then(m => {
        realModule = m;
    });
}

// Helper to create proxy functions/classes that wait for the real module
function lazy(name) {
    if (name === 'CostModel' || name === 'ContractState' || name === 'ContractOperation' ||
        name === 'ContractMaintenanceAuthority' || name === 'QueryContext' || name === 'StateValue' ||
        name === 'VmStack' || name === 'VmResults') {
        // Return a proxy class for classes
        return class Proxy {
            constructor(...args) {
                if (!realModule) throw new Error("Midnight SDK WASM not initialized yet. Ensure you are using it in a client-side effect.");
                return new realModule[name](...args);
            }
            static [Symbol.hasInstance](instance) {
                return realModule && instance instanceof realModule[name];
            }
        };
    }
    // Return a proxy function for others
    return (...args) => {
        if (!realModule) throw new Error("Midnight SDK WASM not initialized yet.");
        return realModule[name](...args);
    };
}

export const CostModel = lazy('CostModel');
export const runProgram = lazy('runProgram');
export const ContractOperation = lazy('ContractOperation');
export const ContractState = lazy('ContractState');
export const ContractMaintenanceAuthority = lazy('ContractMaintenanceAuthority');
export const QueryContext = lazy('QueryContext');
export const StateValue = lazy('StateValue');
export const VmResults = lazy('VmResults');
export const VmStack = lazy('VmStack');
export const valueToBigInt = lazy('valueToBigInt');
export const bigIntToValue = lazy('bigIntToValue');
export const maxAlignedSize = lazy('maxAlignedSize');
export const coinCommitment = lazy('coinCommitment');
export const leafHash = lazy('leafHash');
export const sampleContractAddress = lazy('sampleContractAddress');
export const sampleTokenType = lazy('sampleTokenType');
export const sampleSigningKey = lazy('sampleSigningKey');
export const signData = lazy('signData');
export const signatureVerifyingKey = lazy('signatureVerifyingKey');
export const verifySignature = lazy('verifySignature');
export const encodeTokenType = lazy('encodeTokenType');
export const decodeTokenType = lazy('decodeTokenType');
export const encodeContractAddress = lazy('encodeContractAddress');
export const decodeContractAddress = lazy('decodeContractAddress');
export const encodeCoinPublicKey = lazy('encodeCoinPublicKey');
export const decodeCoinPublicKey = lazy('decodeCoinPublicKey');
export const encodeCoinInfo = lazy('encodeCoinInfo');
export const encodeQualifiedCoinInfo = lazy('encodeQualifiedCoinInfo');
export const decodeCoinInfo = lazy('decodeCoinInfo');
export const decodeQualifiedCoinInfo = lazy('decodeQualifiedCoinInfo');
export const tokenType = lazy('tokenType');
export const transientHash = lazy('transientHash');
export const transientCommit = lazy('transientCommit');
export const persistentHash = lazy('persistentHash');
export const persistentCommit = lazy('persistentCommit');
export const degradeToTransient = lazy('degradeToTransient');
export const upgradeFromTransient = lazy('upgradeFromTransient');
export const hashToCurve = lazy('hashToCurve');
export const ecAdd = lazy('ecAdd');
export const ecMul = lazy('ecMul');
export const ecMulGenerator = lazy('ecMulGenerator');
export const checkProofData = lazy('checkProofData');
export const NetworkId = { Undeployed: 0, DevNet: 1, TestNet: 2, MainNet: 3 };

// Add more as needed by compact-runtime
