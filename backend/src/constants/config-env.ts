import * as dotenv from 'dotenv';
dotenv.config();

// const NEED_TO_CONFIGURED = 'NEED TO CONFIGURED';

// environment
export const ENVIRONMENT: string = process.env.ENVIRONMENT || 'local';

export const URL_PREFIX: string = process.env.URL_PREFIX || '/api';

// application
export const SERVER_PORT: number = +process.env.SERVER_PORT || 3000;
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';

// Postgresql
export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = +process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'base';

// Contract
export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x39f04ca8AA6b10D1241fBa20a1ea16B93C2cd6cE';
export const NETWORK = process.env.NETWORK || 'goerli';
export const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || 'YJ4VUABXPVIQ24RF9P67S26PQHTJUH83BR';
export const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL ||
  'https://eth-goerli.g.alchemy.com/v2/8NdaZToUbmOlIz5scOSnexs3lIXXNggv';
export const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  '2afde6e6684567f1f866a6e0cb27348e2855851668089f407a866db31050042d';
