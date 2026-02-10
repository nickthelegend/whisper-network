# ROADMAP.md

> **Current Phase**: Phase 1: Foundation & Contracts
> **Milestone**: v1.0 - Working Decentralized Email

## Must-Haves (from SPEC)
- [ ] ZK-Verified Handle Registration
- [ ] End-to-End Encrypted Message Flow (IPFS + Ledger)
- [ ] Basic Inbox with Automated Polling
- [ ] Decentralized Decryption in UI

## Phases

### Phase 1: Foundation & Contracts
**Status**: ⬜ Not Started
**Objective**: Deploy the core ZK logic for identity and messaging.
**Requirements**: REQ-01, REQ-03, REQ-05, REQ-09
- Implement `WhisperMail.compact` with message index logic.
- Update `WhisperRegistry.compact` if needed for witness consistency.
- Compile and generate TypeScript bindings for both contracts.

### Phase 2: Secure Sending Flow
**Status**: ⬜ Not Started
**Objective**: Build the "Compose" experience with encryption and IPFS.
**Requirements**: REQ-02, REQ-04, REQ-10
- Implement handle resolution via `WhisperRegistry`.
- Integrate `eth-crypto` for E2EE.
- Wire up IPFS upload and ledger transaction submission.

### Phase 3: Inbox & Polling
**Status**: ⬜ Not Started
**Objective**: Enable message discovery and decryption.
**Requirements**: REQ-06, REQ-07, REQ-08
- Implement background polling for `inbox_entries` ledger variable.
- Build the "Inbox" list view.
- Implement decryption logic when a user clicks a message.

### Phase 4: Polish & Testing
**Status**: ⬜ Not Started
**Objective**: Stabilize the user experience and verify E2EE integrity.
**Requirements**: N/A
- Add loading states for ZK proof generation.
- Add success/error feedback for message delivery.
- Conduct an "End-to-End" test with two local wallet identities.
