import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  get_sender_secret_key(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  send_message(context: __compactRuntime.CircuitContext<PS>,
               sender_handle_hash_0: Uint8Array,
               recipient_handle_hash_0: Uint8Array,
               message_cid_0: Uint8Array,
               sender_ownership_commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  get_message_count(context: __compactRuntime.CircuitContext<PS>,
                    handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  send_message(context: __compactRuntime.CircuitContext<PS>,
               sender_handle_hash_0: Uint8Array,
               recipient_handle_hash_0: Uint8Array,
               message_cid_0: Uint8Array,
               sender_ownership_commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  get_message_count(context: __compactRuntime.CircuitContext<PS>,
                    handle_hash_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
}

export type Ledger = {
  message_counts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  inbox_entries: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
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
