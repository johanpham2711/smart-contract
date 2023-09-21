export const SITE_DOMAIN_URL = 'http://localhost:3000'
export const SITE_TITLE = 'GroundUp - Genesis Pass'
export const SITE_DESC = 'GroundUp Genesis Pass'
export const SITE_KEYWORDS = [
  'GroundUp',
  'NFT',
  'erc721',
  'marketplace',
  'tokens',
  'tokenization',
  'digital goods',
  'trade',
  'crypto',
  'blockchain'
]

export const PATHS = {
  HOME: '/',
  GENESIS_NFT: 'https://groundupstudios.io/',
  TWITTER: 'https://twitter.com/StudiosGroundup',
  MEDIUM: 'https://medium.com/@groundupstudios',
  OPEN_SEA: 'https://opensea.io/collection/groundup-genesis-pass',
  DISCORD: 'https://discord.gg/groundup',
  METAMASK_DOWNLOAD: 'https://metamask.io/download/#listing'
}

export const COOKIES = {
  SIGNATURE: '_sig',
  CONNECTOR: '_conn'
}

export const AccountType = [
  { status: 'WALLET_IN_BOTH_LIST', msg: 'Your wallet address is on the Whitelist!' },
  { status: 'WALLET_IN_ALLOW_LIST_ONLY', msg: 'Your wallet address is on the Allowlist!' },
  { status: 'WALLET_IN_WHITE_LIST_ONLY', msg: 'Your wallet address is on the Whitelist!' },
  { status: 'WALLET_NOT_IN_BOTH_LIST', msg: 'Your wallet address is not eligible to mint.' }
]

export enum EWalletListType {
  ALLOW_LIST = 'ALLOW_LIST',
  WHITE_LIST = 'WHITE_LIST'
}

export enum PHASE {
  WAITING,
  ALLOWLIST,
  WHITELIST,
  OVER
}
