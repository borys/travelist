import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { offerDetailsSlice } from './offer-details/[offerId]/_store/reducers'
import { offerListSlice } from './offer-list/_store/reducers'

const rootReducer = combineReducers({
  offerDetails: offerDetailsSlice.reducer,
  offerList: offerListSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];