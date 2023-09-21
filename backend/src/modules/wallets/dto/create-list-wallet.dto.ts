import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { WALLET_MESSAGE } from 'src/constants/messages';
import { HEX_ADDRESS_REGEX } from 'src/constants/regex';
import { EWalletListType } from 'src/enums';

export class CreateListWalletDto {
  @ApiProperty({
    description: 'List of wallet addresses',
    example: [
      '0x4B741235f451474CEAC5a1F4ADa56523618D9292',
      '0xbE3Af7D88C85240ba3A7a7d4DCCFB62F61eb3D85',
      '0x375ce612097AE25471B792bb7819Dc07BaEcc0fe',
      '0xAA4c05ca1716E445B1a345Af36e9c5440FB347c1',
      '0xaDDb94a86D3BE33cffb86dCB90cc2828bb644cf5',
    ],
    type: [String],
  })
  // @Matches(HEX_ADDRESS_REGEX, {
  //   each: true,
  //   message: WALLET_MESSAGE.WALLET_ADDRESS_NOT_VALID,
  // })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  walletAddresses: string[];

  @ApiProperty({
    name: 'type',
    description: 'Type of wallet',
    example: EWalletListType.ALLOW_LIST,
    type: String,
    enum: EWalletListType,
  })
  @IsIn(Object.values(EWalletListType))
  @IsNotEmpty()
  @IsString()
  type: string;
}
