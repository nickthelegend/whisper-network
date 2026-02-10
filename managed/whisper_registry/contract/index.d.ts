import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  get_secret_key(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  register_handle(context: __compactRuntime.CircuitContext<PS>,
                  handle_hash_0: Uint8Array,
                  ownership_commitment_0: Uint8Array,
                  encryption_pubkey_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verify_owner(context: __compactRuntime.CircuitContext<PS>,
               handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  resolve_key(context: __compactRuntime.CircuitContext<PS>,
              handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  resolve_address(context: __compactRuntime.CircuitContext<PS>,
                  handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  check_availability(context: __compactRuntime.CircuitContext<PS>,
                     handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  register_handle(context: __compactRuntime.CircuitContext<PS>,
                  handle_hash_0: Uint8Array,
                  ownership_commitment_0: Uint8Array,
                  encryption_pubkey_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verify_owner(context: __compactRuntime.CircuitContext<PS>,
               handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  resolve_key(context: __compactRuntime.CircuitContext<PS>,
              handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  resolve_address(context: __compactRuntime.CircuitContext<PS>,
                  handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  check_availability(context: __compactRuntime.CircuitContext<PS>,
                     handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
}

export type Ledger = {
  handles: {
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
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  verified_identities: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
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
