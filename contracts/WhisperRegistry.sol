// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IVerifier.sol"; // Groth16 Verifier Interface

/**
 * @title Whisper Identity Registry
 * @dev Stores valid email commitments. Uses ZK proofs to verify ownership without revealing email.
 */
contract WhisperRegistry is Ownable {
    // Mapping from commitment (Poseidon(secret)) -> IsVerified
    mapping(uint256 => bool) public verifiedIdentities;
    
    // Mapping from commitment -> Whisper Handle (e.g., "alice.whisper")
    mapping(uint256 => string) public handles;
    mapping(string => uint256) public handleToCommitment;

    IVerifier public immutable verifier;

    event IdentityVerified(uint256 indexed commitment, string handle);

    constructor(address _verifier) Ownable(msg.sender) {
        verifier = IVerifier(_verifier);
    }

    /**
     * @notice Register a new Whisper identity with a ZK proof.
     * @param proof The Groth16 proof (a, b, c) from snarkjs
     * @param commitment The public input (Poseidon(secret))
     * @param handle The chosen username (e.g. "alice.whisper")
     */
    function registerIdentity(
        uint256[8] calldata proof, 
        uint256 commitment, 
        string calldata handle
    ) external {
        require(verifier.verifyProof(proof, [commitment]), "Invalid ZK Proof");
        require(!verifiedIdentities[commitment], "Identity already registered");
        require(handleToCommitment[handle] == 0, "Handle already taken");

        verifiedIdentities[commitment] = true;
        handles[commitment] = handle;
        handleToCommitment[handle] = commitment;

        emit IdentityVerified(commitment, handle);
    }

    function isHandleAvailable(string calldata handle) external view returns (bool) {
        return handleToCommitment[handle] == 0;
    }
}
