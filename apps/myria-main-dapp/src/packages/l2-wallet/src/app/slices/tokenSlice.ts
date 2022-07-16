import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NFTState {
  selectedToken: any;
  transactions: any;
}

const initialState: NFTState = {
  selectedToken: null,
  transactions: [],
};

export const tokenSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedTokenFunc: (state, action: PayloadAction<any>) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      state.selectedToken = action.payload;
    },
    setTransactions: (state, action: PayloadAction<any>) => {
      state.transactions = action.payload;
    },
  },
});

export const { setSelectedTokenFunc, setTransactions } = tokenSlice.actions;

export default tokenSlice.reducer;
