import { all, takeLatest } from 'redux-saga/effects'

import { checkWallet, getMintedStats, getProof } from './slices/wallet.slice'
import { checkWalletSaga, getMintedStatsSaga, getProofSaga } from './saga/wallet.saga'

function* rootSaga() {
  yield all([
    takeLatest(checkWallet.type, checkWalletSaga),
    takeLatest(getProof.type, getProofSaga),
    takeLatest(getMintedStats.type, getMintedStatsSaga)
  ])
}

export default rootSaga
