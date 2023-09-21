import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { WALLET_MESSAGE } from 'src/constants/messages';
import { HEX_ADDRESS_REGEX } from 'src/constants/regex';

export class CheckWalletDto {
  @ApiProperty({
    name: 'walletAddress',
    type: String,
    required: true,
    example: '0x375ce612097AE25471B792bb7819Dc07BaEcc0fe',
  })
  @Matches(HEX_ADDRESS_REGEX, {
    message: WALLET_MESSAGE.WALLET_ADDRESS_NOT_VALID,
  })
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
