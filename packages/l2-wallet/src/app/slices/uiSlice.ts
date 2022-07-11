import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NFTState {
  showWithDrawClaimModal: boolean;
  claimAmount: number;
  showClaimPopover: boolean;
  isUpdated: boolean;
  depositAmount: number;
}

const initialState: NFTState = {
  showWithDrawClaimModal: false,
  claimAmount: 0,
  showClaimPopover: false,
  isUpdated: false,
  depositAmount: 0,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setWithdrawClaimModal: (
      state: { showWithDrawClaimModal: any; claimAmount: any; isUpdated: any },
      action: PayloadAction<any>,
    ) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      state.showWithDrawClaimModal = action.payload.show;
      state.claimAmount = action.payload.claimAmount;
      state.isUpdated = action.payload.isUpdated;
    },
    setWithdrawClaimPopover: (
      state: { showClaimPopover: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.showClaimPopover = action.payload;
    },
    setDepositAmount: (
      state: { depositAmount: number },
      action: PayloadAction<number>,
    ) => {
      state.depositAmount = action.payload;
    },
  },
});

export const {
  setWithdrawClaimModal,
  setWithdrawClaimPopover,
  setDepositAmount,
} = uiSlice.actions;

export default uiSlice.reducer;
