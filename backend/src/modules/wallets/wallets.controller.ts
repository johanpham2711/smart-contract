import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckWalletDto } from './dto/check-wallet.dto';
import { CreateListWalletDto } from './dto/create-list-wallet.dto';
import { GetMerkleProofDto } from './dto/get-merkle-proof.dto';
import { WalletsService } from './wallets.service';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOperation({ summary: 'API set list of wallet addresses' })
  @ApiBody({
    type: CreateListWalletDto,
    required: true,
    description: 'Set list of wallet addresses',
  })
  @Post('create-list-wallets')
  @HttpCode(201)
  async createListWallet(@Body() payload: CreateListWalletDto) {
    return this.walletsService.createListWallet(payload);
  }

  @ApiOperation({ summary: 'API check wallet in allowlist and whitelist' })
  @Get('check-wallet')
  @HttpCode(200)
  async checkWallet(@Query() query: CheckWalletDto) {
    return this.walletsService.checkWallet(query);
  }

  @ApiOperation({ summary: 'API get merkle proof in allowlist and whitelist' })
  @Get('proof')
  @HttpCode(200)
  async getMerkleProof(@Query() query: GetMerkleProofDto) {
    return this.walletsService.getMerkleProof(query);
  }

  @ApiOperation({ summary: 'API get minted stats' })
  @Get('minted-stats')
  @HttpCode(200)
  async getMintedStats() {
    return this.walletsService.getMintedStats();
  }
}
