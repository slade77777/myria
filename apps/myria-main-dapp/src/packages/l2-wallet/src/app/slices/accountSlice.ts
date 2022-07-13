import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint no-param-reassign: ["error", { "props": false }] */
interface AccountState {
  walletConnected: boolean;
  connectedAccount: string;
  privateKeyFromSignature: string;
  starkPublicKeyFromPrivateKey: string;
}

const initialState: AccountState = {
  walletConnected: false,
  connectedAccount: '',
  privateKeyFromSignature: '',
  starkPublicKeyFromPrivateKey: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    markWalletConnected: state => {
      state.walletConnected = true;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.connectedAccount = action.payload;
    },
    setStarkPrivateKey: (state, action: PayloadAction<string>) => {
      state.privateKeyFromSignature = action.payload;
    },
    setStarkPublicKey: (state, action: PayloadAction<string>) => {
      state.starkPublicKeyFromPrivateKey = action.payload;
    },
    disconnectAccount: state => {
      state.connectedAccount = '';
      state.privateKeyFromSignature = '';
      state.starkPublicKeyFromPrivateKey = '';
      state.walletConnected = false;
    },
  },
});

export const {
  markWalletConnected,
  setAccount,
  setStarkPrivateKey,
  setStarkPublicKey,
  disconnectAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
