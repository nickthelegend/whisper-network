# REQUIREMENTS.md

## Functional Requirements
| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| REQ-01 | Users must be able to register a unique handle to an encryption public key. | SPEC goal 1 | Pending |
| REQ-02 | Users must be able to resolve a handle's public key from the ledger. | SPEC goal 2 | Pending |
| REQ-03 | Senders must prove ownership of their handle using a secret key (witness) during the send operation. | SPEC goal 3 | Pending |
| REQ-04 | Messages must be encrypted with the recipient's public key before being uploaded to IPFS. | SPEC goal 2 | Pending |
| REQ-05 | The IPFS CID of the encrypted message must be recorded on the Midnight ledger. | SPEC goal 2 | Pending |
| REQ-06 | The frontend must poll the ledger for new messages sent to the user's handle. | SPEC goal 4 | Pending |
| REQ-07 | The UI must display a list of messages and allow the user to decrypt and read them. | SPEC goal 4 | Pending |

## Technical Requirements
| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| REQ-08 | Use `@midnight-ntwrk/midnight-js-indexer-public-data-provider` for ledger state polling. | RESEARCH 1 | Pending |
| REQ-09 | Implement index-based inbox mapping in Compact to allow efficient retrieval. | RESEARCH 1 | Pending |
| REQ-10 | Ensure all sensitive content is encrypted using `eth-crypto` or similar before IPFS storage. | SPEC goal 2 | Pending |
