import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NFTState {
  selectedToken: any;
}

const initialState: NFTState = {
  selectedToken: null,
};

export const tokenSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedTokenFunc: (state, action: PayloadAction<any>) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      state.selectedToken = action.payload;
    },
  },
});

export const { setSelectedTokenFunc } = tokenSlice.actions;

export default tokenSlice.reducer;
