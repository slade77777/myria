import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import WalletConnect from '@walletconnect/web3-provider';
import Web3Modal from '../components/Web3Modal';
// import Web3Modal from 'web3modal';
import Modal from 'src/components/Modal';
import SignIn from 'src/components/SignIn';
import Register from 'src/components/Register';

let web3Modal: Web3Modal;

const SignInModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Sign in" className="shadow-[0_0_40px_10px_#0000004D] md:w-[576px]">
        <SignIn />
      </Modal.Content>
    </Modal>
  );
};

const RegisterModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Register" className="shadow-[0_0_40px_10px_#0000004D] md:w-[576px]">
        <Register />
      </Modal.Content>
    </Modal>
  );
};

interface IAuthenticationContext {
  user: string | undefined;
  login: () => void;
  register: () => void;
  setUser: (user: any) => void;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<string | undefined>(undefined);
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);

  const login = () => {
    setOpenSignIn(true);
    setOpenRegister(false);
  };

  const register = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, register, setUser }}>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
