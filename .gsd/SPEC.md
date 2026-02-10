# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
To build a functional, decentralized, and private email system on the Midnight blockchain where users can register human-readable handles and send encrypted messages stored on IPFS, with all identity verification handled via Zero-Knowledge proofs.

## Goals
1. **Handle Registration**: Users can register a unique handle (e.g., `alice.whisper`) on-chain, mapped to their public encryption key.
2. **Private Messaging**: Secure end-to-end encrypted message delivery using the recipient's public key and IPFS for decentralized storage.
3. **ZK-Verified Sending**: Ensure that only registered handle owners can send messages, using Compact's built-in proof verification.
4. **Inbox Polling**: A simple frontend-driven polling mechanism to detect new incoming messages via the Midnight ledger/indexer.

## Non-Goals (Out of Scope)
- **Advanced Messaging**: No attachments, reply threads, or group chats for v1.
- **Gasless/Relayer Infra**: Users interact directly with the Midnight ledger; no third-party relayers or backend servers.
- **Custom Circuits**: No custom Circom or Snarkjs development; relying entirely on Compact's high-level ZK primitives.
- **Push Notifications**: No real-time websocket notifications (v1 stays with polling).

## Users
- **Privacy-Conscious Individuals**: Users looking for anonymous communication without relying on centralized mail servers (Gmail/Outlook).
- **Midnight Explorers**: Developers and early adopters testing private smart contract capabilities.

## Constraints
- **Midnight Testnet**: Limited by the performance and availability of the current Midnight dev/test environment.
- **Polling Latency**: Message discovery is subject to the 5-10s polling interval.
- **IPFS Persistence**: Relies on IPFS gateway stability for message retrieval.

## Success Criteria
- [ ] User can register a handle and have it appear in `WhisperRegistry`.
- [ ] User A can resolve User B's public key by handle.
- [ ] User A can send an encrypted message that is successfully stored on IPFS.
- [ ] User B can view and decrypt the message in their "Inbox" after polling.
