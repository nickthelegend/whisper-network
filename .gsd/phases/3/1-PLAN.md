---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Inbox Polling & Decryption

## Objective
Implement polling of the `WhisperMail` contract to fetch, filter, and decrypt messages for the user.

## Context
- `lib/mailbox.ts`: Currently uses mock data. Needs to use `inbox_entries` ledger from `WhisperMail`.
- `app/inbox/page.tsx`: UI needs to display real messages.
- `lib/contracts/mail.ts`: Needs a `getMessages` function.
- `lib/secret-manager.ts`: We might need this for private key management if we switch to stored keys.

## Tasks

<task type="auto">
  <name>Implement Message Polling Logic</name>
  <files>
    - lib/contracts/mail.ts
  </files>
  <action>
    Add `fetchInboxMessages(api: any, recipientHandle: string, count: number): Promise<any[]>` to the Mail wrapper.
    Logic:
    1.  Hash the `recipientHandle`.
    2.  Query `message_counts` for total count.
    3.  Iterate from `0` to `count` (or backwards).
    4.  Derive the `InboxKey` struct and hash it to get the `inbox_entries` key.
    5.  Lookup the CID from `inbox_entries`.
    6.  Fetch the IPFS content using the CID.
    7.  Return the array of encrypted payloads.
  </action>
  <verify>
    Verify that `fetchInboxMessages` returns an array of encrypted message objects from IPFS.
  </verify>
  <done>
    Helper function is implemented in `lib/contracts/mail.ts`.
  </done>
</task>

<task type="auto">
  <name>Implement Decryption & UI Integration</name>
  <files>
    - lib/mailbox.ts
  </files>
  <action>
    Update `fetchRealMessages` in `mailbox.ts`:
    1.  Call `joinMail` (from `lib/contracts/mail.ts`) to get the API.
    2.  Call `fetchInboxMessages`.
    3.  Retrieve the private key from local storage (saved during registration).
    4.  Use `EthCrypto.decryptWithPrivateKey` to decrypt each message payload.
    5.  Map the decrypted data to the `WhisperMessage` interface.
  </action>
  <verify>
    Check if `fetchRealMessages` returns correctly formatted, decrypted messages.
  </verify>
  <done>
    `mailbox.ts` now fetches from chain and decrypts.
  </done>
</task>

<task type="auto">
  <name>Connect UI</name>
  <files>
    - app/inbox/page.tsx
  </files>
  <action>
    Ensure the `InboxPage` calls `fetchRealMessages` and displays the results.
    Handle loading states and empty inboxes.
  </action>
  <verify>
    UI displays messages fetched from the contract.
  </verify>
  <done>
    Inbox UI is connected to the real data source.
  </done>
</task>

## Success Criteria
- [ ] User can see messages sent to their handle in the Inbox.
- [ ] Messages are decrypted correctly using the stored private key.
- [ ] IPFS content is fetched and parsed.
