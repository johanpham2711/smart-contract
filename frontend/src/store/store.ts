import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router'
import Router from 'next/router'
import createSagaMiddleware from 'redux-saga'

import localReducer from './slices/local.slice'
import walletReducer from './slices/wallet.slice'
import rootSaga from './saga'

const routerMiddleware = createRouterMiddleware()
const sagaMiddleware = createSagaMiddleware()
const { asPath } = Router.router || {}

const reducer = combineReducers({
  local: localReducer,
  wallet: walletReducer,
  router: routerReducer
})

export const store = configureStore({
  preloadedState: {
    router: initialRouterState(asPath)
  },
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false })
      .concat(routerMiddleware)
      .concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
