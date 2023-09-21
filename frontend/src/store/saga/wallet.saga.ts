import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'

import { walletApi } from '~/api/wallet.api'
import {
  checkWalletError,
  checkWalletSuccess,
  getMintedStatsError,
  getMintedStatsSuccess,
  getProofError,
  getProofSuccess
} from '../slices/wallet.slice'

export function* checkWalletSaga(action: PayloadAction<{ walletAddress: string }>) {
  try {
    const { message } = yield call(walletApi.checkWallet, action.payload)
    if (message) {
      yield put(checkWalletSuccess(message))
    }
  } catch (error) {
    yield put(checkWalletError(error))
  }
}

export function* getProofSaga(action: PayloadAction<{ walletAddress: string; type: string }>) {
  try {
    const { data } = yield call(walletApi.proof, action.payload)
    if (data && data.merkleProof) {
      yield put(getProofSuccess(data.merkleProof))
    }
  } catch (error) {
    yield put(getProofError(error))
  }
}

export function* getMintedStatsSaga() {
  try {
    const { data } = yield call(walletApi.mintedStats)
    if (data && data.mintedStats) {
      yield put(getMintedStatsSuccess(data.mintedStats))
    }
  } catch (error) {
    yield put(getMintedStatsError(error))
  }
}
