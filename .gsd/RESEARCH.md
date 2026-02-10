# RESEARCH.md - Whisper Network Technical Investigation

## 1. Midnight Indexer Polling
The standard Midnight Indexer provides a `publicDataProvider` that allows querying the current state of any ledger variable.

### Recommendation for Inbox Implementation
To efficiently poll for messages without a custom indexer:
1. **Ledger Counters**: Maintain a `Map<Bytes<32>, Field>` called `message_counts` that stores the total number of messages sent to a `handle_hash`.
2. **Indexed Ledger**: Store messages in a `Map<Bytes<64>, Bytes<32>>` called `inbox_entries`, where the key is `hash(recipient_handle_hash, current_index)`.
3. **Polling Strategy**:
   - Query `message_counts.lookup(my_handle_hash)` to get the count `N`.
   - Iterate from `0` to `N-1` and query `inbox_entries.lookup(hash(my_handle_hash, i))` to get the IPFS CIDs.
   - Cache results locally so we only fetch new indices on subsequent polls.

## 2. Compact Identity Ownership Proofs
Compact 0.20+ uses `witness` variables to represent private information used within circuits.

### Pattern: Owner-Only Write
To ensure only the owner of a handle can send "from" that handle (or perform other owner actions):
```compact
// Inside a circuit
witness secret_key: Bytes<32>;
let my_commitment = hash(secret_key);
assert(registry_handles.lookup(handle_hash) == my_commitment, "Not the owner of this handle");
```

## 3. Storage Layer: IPFS vs Arweave
For v1, **IPFS (via Pinata)** is preferred due to:
- Simpler `fetch` API for retrieval.
- Fast propagation for near real-time polling feel.
- Existing familiarity in the codebase (`lib/ipfs.ts`).

## 4. Message Object Schema
To ensure consistent decryption and display, the IPFS blob should follow this format:
```json
{
  "version": "1.0",
  "from": "alice.whisper",
  "recipient": "bob.whisper",
  "encryptedData": "...", // Encompasses subject and body
  "timestamp": 1739200000
}
```

## 5. Potential Roadblocks
- **Ledger Map Size**: Iterating over many ledger keys might be slow via the default indexer. *Correction*: Polling specific keys by `hash(handle, index)` is an O(1) operation per query, which is acceptable for v1 index fetching.
- **Privacy**: The `message_counts` and `inbox_entries` keys are public by default in `export ledger`. 
  - *Mitigation for v1*: We accept that "X received a message" is public, but the content remains private on IPFS.
  - *Future*: Use private commitments or specialized nullifiers to obfuscate message delivery.
