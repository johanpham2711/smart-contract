import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IWalletState {
  checkingWallet: boolean
  checkedWallet: boolean
  checkWalletResult: string | null
  checkWalletError: any
  gettingProof: boolean
  gotProof: boolean
  proof: string[]
  getProofError: any
  gettingMintedStats: boolean
  gotMintedStats: boolean
  mintedStats: {
    allowlistMinted: number
    whitelistMinted: number
    totalAllowMint: number
  } | null
  mintedStatsError: any
}

const walletState: IWalletState = {
  checkingWallet: false,
  checkedWallet: false,
  checkWalletResult: null,
  checkWalletError: null,
  gettingProof: false,
  gotProof: false,
  proof: [],
  getProofError: null,
  gettingMintedStats: false,
  gotMintedStats: false,
  mintedStats: null,
  mintedStatsError: null
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletState,
  reducers: {
    /**
     * checkWallet
     */
    checkWallet(state, action: PayloadAction<{ walletAddress: string }>) {
      state.checkingWallet = true
      state.checkedWallet = false
    },
    checkWalletSuccess(state, action) {
      state.checkingWallet = false
      state.checkedWallet = true
      state.checkWalletResult = action.payload
    },
    checkWalletError(state, action) {
      state.checkingWallet = false
      state.checkedWallet = false
      state.checkWalletError = action.payload
    },
    resetCheckWalletResult(state) {
      state.checkingWallet = false
      state.checkedWallet = false
      state.checkWalletResult = null
      state.checkWalletError = null
    },

    /**
     * getProof
     */
    getProof(state, action: PayloadAction<{ walletAddress: string; type: string }>) {
      state.gettingProof = true
      state.gotProof = false
    },
    getProofSuccess(state, action) {
      state.gettingProof = false
      state.gotProof = true
      state.proof = action.payload
    },
    getProofError(state, action) {
      state.gettingProof = false
      state.gotProof = false
      state.getProofError = action.payload
    },
    resetProof(state) {
      state.gettingProof = false
      state.gotProof = false
      state.proof = []
      state.getProofError = null
    },

    /**
     * getMintedStats
     */
    getMintedStats(state) {
      state.gettingMintedStats = true
      state.gotMintedStats = false
    },
    getMintedStatsSuccess(state, action) {
      state.gettingMintedStats = false
      state.gotMintedStats = true
      state.mintedStats = action.payload
    },
    getMintedStatsError(state, action) {
      state.gettingMintedStats = false
      state.gotMintedStats = false
      state.mintedStatsError = action.payload
    }
  }
})

export const {
  checkWallet,
  checkWalletSuccess,
  checkWalletError,
  resetCheckWalletResult,
  getProof,
  getProofSuccess,
  getProofError,
  resetProof,
  getMintedStats,
  getMintedStatsSuccess,
  getMintedStatsError
} = walletSlice.actions
export default walletSlice.reducer
