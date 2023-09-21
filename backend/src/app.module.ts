import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database/postgresql.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [PostgresqlModule, WalletsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
