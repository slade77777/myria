import { useContext, useEffect, useState } from 'react';
import React, { useCallback } from 'react';
import WalletConnect from '@walletconnect/web3-provider';
import Web3Modal from '../components/Web3Modal';
import Modal from 'src/components/Modal';
import SignIn from 'src/components/SignIn';
import Register from 'src/components/Register';
import { Verify } from 'src/components/SliderCapcha';
import puzzle from '../../public/images/capcha.png';

const VerifyModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title={<p className="body">Security Verification</p>}
        className="h-[360px] shadow-[0_0_40px_10px_#0000004D] md:w-[342px]"
        headerClassName="!px-3 !pt-4">
        <Verify
          width={310}
          height={188}
          visible={true}
          imgUrl={puzzle.src}
          text="Slide to complete the puzzle"
          onSuccess={() => alert('success')}
          onFail={() => alert('fail')}
        />
      </Modal.Content>
    </Modal>
  );
};

const SignInModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Sign in" className="shadow-[0_0_40px_10px_#0000004D]">
        <SignIn />
      </Modal.Content>
    </Modal>
  );
};

const RegisterModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Register" className="shadow-[0_0_40px_10px_#0000004D]">
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
  openVerify: () => void;
  closeVerify: () => void;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<string | undefined>(undefined);
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);

  const login = () => {
    setOpenSignIn(true);
    setOpenRegister(false);
    setOpenVerifyModal(false);
  };

  const register = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
    setOpenVerifyModal(false);
  };

  const openVerify = () => {
    setOpenVerifyModal(true);
    setOpenSignIn(false);
  };

  const closeVerify = () => {
    setOpenVerifyModal(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, login, register, setUser, openVerify, closeVerify }}>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
      <VerifyModal open={openVerifyModal} onClose={closeVerify} />
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
