---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Contract Wrappers & Resolution

## Objective
Create TypeScript wrappers for the newly compiled contracts and implement handle resolution.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- managed/whisper_registry/contract/index.d.ts
- managed/whisper_mail/contract/index.d.ts
- lib/providers.ts

## Tasks

<task type="auto">
  <name>Create Registry and Mail Wrappers</name>
  <files>
    - lib/contracts/registry.ts
    - lib/contracts/mail.ts
  </files>
  <action>
    Create wrapper functions using `MidnightSetupAPI.joinContract` or `deployContract` (for dev testing).
    Implement helper methods:
    - `resolveHandle(handle: string): Promise<string>` - uses `WhisperRegistry.resolve_key`.
    - `sendMessage(sender: string, recipient: string, cid: string): Promise<string>` - uses `WhisperMail.send_message`.
    
    Ensure `Witnesses` are implemented for `get_sender_secret_key` and `get_secret_key`. Use a consistent secret storage (e.g., derived from wallet or in private state).
  </action>
  <verify>
    Check if the wrapper files export the necessary functions.
  </verify>
  <done>
    Wrappers exist and correctly typed against the managed artifacts.
  </done>
</task>

<task type="auto">
  <name>Implement Secret Key Derivation</name>
  <files>
    - lib/secret-manager.ts
  </files>
  <action>
    Implement a simple utility to derive or retrieve the Whisper secret key used for ZK proofs.
    For v1, this can be a static key or derived from the wallet address.
  </action>
  <verify>
    Verify exported function for key retrieval.
  </verify>
  <done>
    Secret management utility is ready.
  </done>
</task>

## Success Criteria
- [ ] TypeScript wrappers can successfully invoke contract circuits.
- [ ] Handle resolution returns a public key for a registered handle.
