// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "./merkle-proof.sol";

contract MerkleTreeWhitelist {
    bytes32 public merkleRoot =
        0xeeefd63003e0e702cb41cd0043015a6e26ddb38073cc6ffeb0ba3e808ba8c097;

    mapping(address => bool) public whitelistMinted;

    function whitelistMint(bytes32[] calldata _merkleProof) public {
        require(!whitelistMinted[msg.sender], "Wallet address already minted");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Wallet address not in the whitelist."
        );
        whitelistMinted[msg.sender] = true;
    }
}

// [
//   "0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb",
//   "0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c"
// ]
