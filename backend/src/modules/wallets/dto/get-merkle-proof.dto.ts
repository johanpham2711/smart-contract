import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { EWalletListType } from 'src/enums';

import { CheckWalletDto } from './check-wallet.dto';

export class GetMerkleProofDto extends CheckWalletDto {
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
