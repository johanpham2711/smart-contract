const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

// const leaves = [
//   '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
//   '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
//   '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db'
// ].map(x => keccak256(x))
// const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
// const root = '0x' + tree.getRoot().toString('hex')
// const leaf = keccak256('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')
// const proof = tree.getProof(leaf)

// console.log('Merkle root: ', root)
// console.log('Proof: ', tree.getHexProof(leaf))
// console.log('Verify: ', tree.verify(proof, leaf, root)) // true

let whitelistAddresses = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getRoot();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claimingAddress = leafNodes[0];

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));