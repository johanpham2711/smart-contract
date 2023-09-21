import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { Wallet } from '../../database/entities';

@Injectable()
export class WalletsRepository extends BaseRepository<Wallet> {
  constructor(@InjectModel(Wallet) readonly model: typeof Wallet) {
    super(model);
  }
}
