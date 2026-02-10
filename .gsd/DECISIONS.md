# Decisions

> ADR (Architecture Decision Records) for Whisper Network

## ADR 1: Index-Based Inbox Ledger
- **Status**: Accepted
- **Context**: We need a way to retrieve messages for a specific user without scanning the entire blockchain.
- **Decision**: We will use a `Map<Bytes<64>, Bytes<32>>` where the key is `hash(recipient_handle_hash, index)`.
- **Consequence**: Enables O(1) polling for new messages if the count is known. Requires maintaining a separate count on-chain.

## ADR 2: IPFS for Blob Storage
- **Status**: Accepted
- **Context**: Midnight ledger storage is expensive and limited to small fields/bytes.
- **Decision**: Use IPFS (via Pinata) to store encrypted message payloads.
- **Consequence**: Keeps the ledger lightweight, only storing content hashes (CIDs).
