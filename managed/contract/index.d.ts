import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  register(context: __compactRuntime.CircuitContext<PS>,
           handle_hash_0: Uint8Array,
           commitment_0: Uint8Array,
           pubkey_0: bigint,
           secret_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  resolve_handle(context: __compactRuntime.CircuitContext<PS>,
                 handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  is_claimed(context: __compactRuntime.CircuitContext<PS>,
             handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  register(context: __compactRuntime.CircuitContext<PS>,
           handle_hash_0: Uint8Array,
           commitment_0: Uint8Array,
           pubkey_0: bigint,
           secret_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  resolve_handle(context: __compactRuntime.CircuitContext<PS>,
                 handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  is_claimed(context: __compactRuntime.CircuitContext<PS>,
             handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  registry: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  public_keys: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
