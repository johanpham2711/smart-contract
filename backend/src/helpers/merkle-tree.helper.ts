/* eslint-disable @typescript-eslint/indent */
import KECCAK256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { MERKLE_TREE_MESSAGE } from 'src/constants/messages';
import { IMerkleProof } from 'src/interfaces';

import { ErrorHelper } from './error.utils';
export class MerkleTreeHelper {
  static createMerkleTree(values: string[]): MerkleTree {
    const leaves = values.map((x) => KECCAK256(x));
    const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true });
    return tree;
  }

  static getMerkleRoot(tree: MerkleTree): string {
    return '0x' + tree.getRoot().toString('hex');
  }

  static getMerkleProof(tree: MerkleTree, leaf: string): IMerkleProof[] {
    try {
      const hexLeaf = KECCAK256(leaf);
      const proof = tree.getProof(hexLeaf);
      return proof;
    } catch (error: unknown) {
      ErrorHelper.BadRequestException(MERKLE_TREE_MESSAGE.WALLET_NOT_IN_LIST);
      console.log('getMerkleProof error: ', error);
    }
  }

  static getMerkleHexProof(tree: MerkleTree, leaf: string): string[] {
    try {
      const hexLeaf = KECCAK256(leaf);
      const proof = tree.getHexProof(hexLeaf);
      return proof;
    } catch (error: unknown) {
      console.log('getMerkleProof error: ', error);
      ErrorHelper.BadRequestException(MERKLE_TREE_MESSAGE.WALLET_NOT_IN_LIST);
    }
  }

  static verifyLeafInclusion(tree: MerkleTree, leaf: string): boolean {
    let isLeafInclusion = false;
    try {
      const hexLeaf = KECCAK256(leaf);
      const root = this.getMerkleRoot(tree);
      const proof = this.getMerkleProof(tree, leaf);
      isLeafInclusion = tree.verify(proof, hexLeaf, root);
    } catch (error: unknown) {
      // console.log('verifyLeafInclusion error: ', error);
    }
    return isLeafInclusion;
  }
}
