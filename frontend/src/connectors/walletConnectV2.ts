import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

export const [walletConnectV2, useWalletConnectV2] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
        chains: [
          process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID
            ? parseInt(process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID)
            : 1
        ],
        showQrModal: true
      }
    })
)
