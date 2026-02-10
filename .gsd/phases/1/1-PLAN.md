---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Core Compact Contracts

## Objective
Implement and update the Compact smart contracts to support ZK-verified handle ownership and index-based message storage.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- .gsd/RESEARCH.md
- contracts/WhisperRegistry.compact
- contracts/WhisperMail.compact (to be created)

## Tasks

<task type="auto">
  <name>Update WhisperRegistry for Ownership Verification</name>
  <files>
    - contracts/WhisperRegistry.compact
  </files>
  <action>
    Modify `WhisperRegistry.compact` to include:
    1. A way to store the commitment of the owner's secret key during registration.
    2. A circuit or helper that verifies a witness (secret key) against the stored commitment for a given handle.
    
    Ref: RESEARCH.md Section 2 for the witness pattern.
  </action>
  <verify>
    Check file for syntactic correctness of Compact 0.20 code.
  </verify>
  <done>
    `WhisperRegistry.compact` includes ownership commitment logic.
  </done>
</task>

<task type="auto">
  <name>Implement WhisperMail with Indexed Inbox</name>
  <files>
    - contracts/WhisperMail.compact
  </files>
  <action>
    Create `WhisperMail.compact` implementing ADR 1:
    1. `export ledger message_counts: Map<Bytes<32>, Field>` (handle_hash -> count).
    2. `export ledger inbox_entries: Map<Bytes<64>, Bytes<32>>` (hash(recipient_handle, index) -> IPFS CID).
    3. `export circuit send_message` that:
       - Takes sender handle, recipient handle, and IPFS CID.
       - Verifies sender handle ownership (importing logic from WhisperRegistry if needed, or re-implementing basic witness check).
       - Increments recipient's message count.
       - Inserts the CID at the new index.
  </action>
  <verify>
    Check file structure and ledger definitions.
  </verify>
  <done>
    `WhisperMail.compact` exists with indexed storage and send circuit.
  </done>
</task>

## Success Criteria
- [ ] Compact contracts reflect the architectural decisions in RESEARCH.md.
- [ ] `send_message` logic correctly increments and indexes messages.
