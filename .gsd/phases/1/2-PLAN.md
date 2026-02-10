---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Compilation and Bindings

## Objective
Compile the Compact contracts and generate the necessary TypeScript bindings for frontend integration.

## Context
- contracts/WhisperRegistry.compact
- contracts/WhisperMail.compact
- package.json (to check build scripts)

## Tasks

<task type="auto">
  <name>Compile Compact Contracts</name>
  <files>
    - contracts/WhisperRegistry.compact
    - contracts/WhisperMail.compact
  </files>
  <action>
    Run the Compact compiler to generate:
    1. Contract artifacts (.compact-json).
    2. ZK artifacts (if applicable for the local dev flow).
    
    Use the existing compilation tools/scripts if available, otherwise use `compactc`.
  </action>
  <verify>
    Check for presence of compiled artifacts in the output directory (e.g., `managed/`).
  </verify>
  <done>
    Both contracts are compiled successfully without errors.
  </done>
</task>

<task type="auto">
  <name>Generate TypeScript Bindings</name>
  <files>
    - managed/
  </files>
  <action>
    Generate TypeScript contract APIs using the Midnight SDK tools.
    Ensure `@midnight-ntwrk/midnight-js-contracts` can consume these bindings.
  </action>
  <verify>
    Check `managed/` for .ts files corresponding to the contracts.
  </verify>
  <done>
    TypeScript bindings exist for `WhisperRegistry` and `WhisperMail`.
  </done>
</task>

## Success Criteria
- [ ] Compiled contract artifacts are present.
- [ ] TypeScript bindings are generated and ready for use in `lib/`.
- [ ] No compilation errors in the console.
