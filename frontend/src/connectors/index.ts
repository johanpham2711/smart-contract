import { Web3ReactHooks } from '@web3-react/core'
import { metaMask, useMetaMask } from './metaMask'
import { walletConnectV2, useWalletConnectV2 } from './walletConnectV2'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

export const connectors: [MetaMask | WalletConnectV2, Web3ReactHooks][] = [
  [metaMask, useMetaMask],
  [walletConnectV2, useWalletConnectV2]
]
