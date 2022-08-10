import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './slices/accountSlice';
import nftSlice from './slices/nftSlice';
import uiSlice from './slices/uiSlice';
import tokenSlice from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    nfts: nftSlice,
    ui: uiSlice,
    token: tokenSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
