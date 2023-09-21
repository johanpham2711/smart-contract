import { Injectable } from '@nestjs/common';
import { MERKLE_TREE_MESSAGE, WALLET_MESSAGE } from 'src/constants/messages';
import { getMintedStats } from 'src/contracts';
import { Wallet } from 'src/database/entities';
import { EWalletListType } from 'src/enums';
import { ErrorHelper, MerkleTreeHelper } from 'src/helpers';
import { IMintedStats } from 'src/interfaces';

import { CheckWalletDto } from './dto/check-wallet.dto';
import { CreateListWalletDto } from './dto/create-list-wallet.dto';
import { GetMerkleProofDto } from './dto/get-merkle-proof.dto';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async createListWallet(payload: CreateListWalletDto): Promise<{
    walletList: Wallet;
    message: string;
  }> {
    const { walletAddresses, type } = payload;

    const tree = MerkleTreeHelper.createMerkleTree(walletAddresses);
    const treeRoot = MerkleTreeHelper.getMerkleRoot(tree);
    let walletList = await this.walletsRepository.findOne({
      where: { type },
    });
    if (walletList) {
      [walletList] = await this.walletsRepository.update(
        {
          treeRoot,
          walletList: walletAddresses,
        },
        {
          type,
        },
      );
    } else {
      walletList = await this.walletsRepository.create({
        type,
        treeRoot,
        walletList: walletAddresses,
      });
    }
    return {
      walletList: walletList,
      message: WALLET_MESSAGE.CREATE_LIST_WALLET_SUCCESS,
    };
  }

  async checkWallet(query: CheckWalletDto): Promise<{
    message: string;
  }> {
    const { walletAddress } = query;
    const [allowList, whiteList] = await Promise.all([
      this.walletsRepository.findOne({
        where: { type: EWalletListType.ALLOW_LIST },
      }),
      this.walletsRepository.findOne({
        where: { type: EWalletListType.WHITE_LIST },
      }),
    ]);

    if (!allowList || !whiteList)
      return {
        message: WALLET_MESSAGE.LIST_WALLET_NOT_FOUND,
      };

    const allowListTree = MerkleTreeHelper.createMerkleTree(
      allowList.walletList,
    );
    const whiteListTree = MerkleTreeHelper.createMerkleTree(
      whiteList.walletList,
    );

    const isAllowList = MerkleTreeHelper.verifyLeafInclusion(
      allowListTree,
      walletAddress,
    );
    const isWhiteList = MerkleTreeHelper.verifyLeafInclusion(
      whiteListTree,
      walletAddress,
    );
    const message = this.getCheckWalletMessage(isAllowList, isWhiteList);
    return {
      message,
    };
  }

  getCheckWalletMessage(isAllowList: boolean, isWhiteList: boolean): string {
    let message: string;
    if (isAllowList && isWhiteList) {
      message = WALLET_MESSAGE.WALLET_IN_BOTH_LIST;
    } else if (isAllowList) {
      message = WALLET_MESSAGE.WALLET_IN_ALLOW_LIST_ONLY;
    } else if (isWhiteList) {
      message = WALLET_MESSAGE.WALLET_IN_WHITE_LIST_ONLY;
    } else {
      message = WALLET_MESSAGE.WALLET_NOT_IN_BOTH_LIST;
    }
    return message;
  }

  async getMerkleProof(
    query: GetMerkleProofDto,
  ): Promise<{ merkleProof: string[]; message: string }> {
    const { walletAddress, type } = query;
    const walletList = await this.walletsRepository.findOne({
      where: { type },
    });
    if (!walletList)
      ErrorHelper.BadRequestException(WALLET_MESSAGE.LIST_WALLET_NOT_FOUND);

    const walletListTree = MerkleTreeHelper.createMerkleTree(
      walletList.walletList,
    );
    const merkleProof = MerkleTreeHelper.getMerkleHexProof(
      walletListTree,
      walletAddress,
    );
    if (!merkleProof.length)
      ErrorHelper.BadRequestException(MERKLE_TREE_MESSAGE.WALLET_NOT_IN_LIST);
    return { merkleProof, message: WALLET_MESSAGE.GET_MERKLE_PROOF_SUCCESS };
  }

  async getMintedStats(): Promise<{
    mintedStats: IMintedStats;
    message: string;
  }> {
    // const [allowList, whiteList] = await Promise.all([
    //   this.walletsRepository.findOne({
    //     where: { type: EWalletListType.ALLOW_LIST },
    //   }),
    //   this.walletsRepository.findOne({
    //     where: { type: EWalletListType.WHITE_LIST },
    //   }),
    // ]);
    const whiteList = await this.walletsRepository.findOne({
      where: { type: EWalletListType.WHITE_LIST },
    });
    const mintedStats = await getMintedStats(
      // allowList.walletList,
      whiteList.walletList,
    );
    return {
      mintedStats,
      message: WALLET_MESSAGE.GET_MINTED_STATS_SUCCESS,
    };
  }
}
