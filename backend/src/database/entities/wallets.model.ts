import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EWalletListType } from 'src/enums';

@Table({
  tableName: 'wallets',
  underscored: true,
})
export class Wallet extends Model {
  @Column
  type: EWalletListType;

  @Column({ field: 'tree_root' })
  treeRoot: string;

  @Column({ field: 'wallet_list', type: DataType.JSON })
  walletList: string[];
}
