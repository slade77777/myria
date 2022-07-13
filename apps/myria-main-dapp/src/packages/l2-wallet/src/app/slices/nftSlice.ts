import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NFTState {
  nfts: any;
}

const initialState: NFTState = {
  nfts: [],
};

export const nftSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNFTs: (state, action: PayloadAction<any>) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      state.nfts = action.payload;
    },
  },
});

export const { setNFTs } = nftSlice.actions;

export default nftSlice.reducer;
