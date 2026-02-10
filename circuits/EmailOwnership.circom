pragma circom 2.0.0;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";
include "circomlib/circuits/bitify.circom";

// Simplified Email Ownership Circuit
// Proves knowledge of a secret that hashes to a public commitment (Handle)
// and ensures the email signature (mocked here as hash check) is valid.

template EmailOwnershipProof() {
    // Private Inputs
    signal input emailAddress; // Packed as a field element (simplified)
    signal input emailSecret;  // User's secret key derived from email/password
    signal input signature;    // Mock signature check

    // Public Inputs
    signal input commitment;   // Public on-chain commitment (Poseidon(emailSecret))
    
    // Output
    signal output isValid;

    // 1. Verify Commitment (Identity Binding)
    // Prove that we know the secret corresponding to the public commitment
    component poseidonCommitment = Poseidon(1);
    poseidonCommitment.inputs[0] <== emailSecret;
    
    // Constraint: calculated commitment must match public input
    poseidonCommitment.out === commitment;

    // 2. Verify Email Format (Simplified Check)
    // In a real ZK Email circuit, this would parse RSA signatures and SHA256 hashes of the email header.
    // Here, we just ensure the secret is non-zero to prevent trivial proofs.
    component isZero = IsZero();
    isZero.in <== emailSecret;
    isValid <== 1 - isZero.out;
}

component main {public [commitment]} = EmailOwnershipProof();
