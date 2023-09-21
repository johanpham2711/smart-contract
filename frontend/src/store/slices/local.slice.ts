import { createSlice } from '@reduxjs/toolkit'

interface ILocalState {
  isDownloadMetaMaskModalOpened: boolean
  isConnectWalletModalOpened: boolean
}

const localState: ILocalState = {
  isDownloadMetaMaskModalOpened: false,
  isConnectWalletModalOpened: false
}

const localSlice = createSlice({
  name: 'local',
  initialState: localState,
  reducers: {
    /**
     * downloadMetaMaskModal
     */
    openDownloadMetaMaskModal(state) {
      state.isDownloadMetaMaskModalOpened = true
    },
    closeDownloadMetaMaskModal(state) {
      state.isDownloadMetaMaskModalOpened = false
    },

    /**
     * connectWalletModal
     */
    openConnectWalletModal(state) {
      state.isConnectWalletModalOpened = true
    },
    closeConnectWalletModal(state) {
      state.isConnectWalletModalOpened = false
    }
  }
})

export const {
  openDownloadMetaMaskModal,
  closeDownloadMetaMaskModal,
  openConnectWalletModal,
  closeConnectWalletModal
} = localSlice.actions
export default localSlice.reducer
