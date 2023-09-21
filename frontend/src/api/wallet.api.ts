import { getMainClient } from './client/main.client'

const mainClient = getMainClient()

export const walletApi = {
  async checkWallet(data: { walletAddress: string }) {
    try {
      const res = await mainClient.get('/wallets/check-wallet', { params: data })
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async proof(data: { walletAddress: string }) {
    try {
      const res = await mainClient.get('/wallets/proof', { params: data })
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async mintedStats() {
    try {
      const res = await mainClient.get('/wallets/minted-stats')
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  }
}
