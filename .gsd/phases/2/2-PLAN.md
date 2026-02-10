---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: E2EE & IPFS Sending

## Objective
Update the Compose page to implement the real E2EE sending flow with IPFS storage and Midnight ledger submission.

## Context
- app/inbox/compose/page.tsx
- lib/ipfs.ts
- lib/contracts/mail.ts
- lib/contracts/registry.ts

## Tasks

<task type="auto">
  <name>Implement E2EE with eth-crypto</name>
  <files>
    - app/inbox/compose/page.tsx
  </files>
  <action>
    Integrate `EthCrypto.encryptWithPublicKey` using the resolved recipient public key.
    The payload should include:
    ```json
    {
      "from": sender_handle,
      "subject": encrypted_subject,
      "body": encrypted_body,
      "timestamp": Date.now()
    }
    ```
    Note: Subject can be partially masked or fully encrypted depending on privacy needs.
  </action>
  <verify>
    Verify decryption logic (mental check or test) works with encryption logic.
  </verify>
  <done>
    E2EE encryption is integrated into the handleTransmit flow.
  </done>
</task>

<task type="auto">
  <name>Wire up IPFS and Ledger Submission</name>
  <files>
    - app/inbox/compose/page.tsx
  </files>
  <action>
    Update `handleTransmit` to:
    1. Upload encrypted payload to IPFS using `uploadToIPFS`.
    2. Convert the CID to `Bytes<32>` (using a hash of the CID or base58 decoding if required by contract).
    3. Call `sendMessage` from the contract wrapper.
  </action>
  <verify>
    Check the flow from Resolve -> Encrypt -> Upload -> Ledger.
  </verify>
  <done>
    The "Transmit_Msg" button performs a real E2EE send.
  </done>
</task>

## Success Criteria
- [ ] Mesage payload is encrypted before leaving the client.
- [ ] IPFS CID is successfully recorded on the Midnight ledger.
- [ ] User receives a real Midnight Tx Hash.
