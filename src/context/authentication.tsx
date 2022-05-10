import React, { useContext, useState } from 'react';
import Modal from 'src/components/Modal';
import SignIn from 'src/components/SignIn';
import Register from 'src/components/Register';
import ForgotPassword from 'src/components/ForgotPassword';
import ResetPassword from 'src/components/ResetPassword';
import { Verify } from 'src/components/SliderCapcha';
import puzzle from '../../public/images/capcha.png';
import { IFormSignInInput } from 'src/components/SignIn/SignIn';
import { IFormRegisterInput } from 'src/components/Register/Register';
import { IFormForgotPasswordInput } from 'src/components/ForgotPassword/ForgotPassword';
import { IFormResetPasswordInput } from 'src/components/ResetPassword/ResetPassword';
import apiClient from 'src/client';
import { useMutation, UseMutationResult } from 'react-query';
import { useGA4 } from 'src/lib/ga';
import { useWalletContext } from './wallet';

type User = {
  user_id: string;
  wallet_id?: string;
}

const VerifyModal = ({ open, onClose, onSuccess }: { open: boolean; onClose?: () => void, onSuccess?: () => void }) => {
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
          onSuccess={onSuccess}
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

const ForgotPasswordModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Forgot Password" className="shadow-[0_0_40px_10px_#0000004D]">
        <ForgotPassword />
      </Modal.Content>
    </Modal>
  );
};

const ResetPasswordModal = ({ open, isResetSuccess, onClose }: { open: boolean; isResetSuccess: boolean, onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={isResetSuccess ? "Your password was reset" : "Create a new password"} className="shadow-[0_0_40px_10px_#0000004D]">
        <ResetPassword />
      </Modal.Content>
    </Modal>
  );
};

interface IAuthenticationContext {
  user: User | undefined;
  login: () => void;
  register: () => void;
  forgotPassword: () => void;
  resetPassword: () => void;
  openVerify: (data: IFormSignInInput) => void;
  doRegister: (data: IFormRegisterInput) => void;
  doForgotPassword: (data: IFormForgotPasswordInput) => void;
  doResetPassword: (data: IFormResetPasswordInput) => void;
  isPostingLogin: boolean;
  isPostingRegister: boolean;
  isPostingForgotPassword: boolean;
  isPostingResetPassword: boolean;
  isResetSuccess: boolean;
  loginError: string;
  registerError: string;
  forgotPasswordError: string;
  resetPasswordError: string;
  registerByWalletMutation: UseMutationResult<User, unknown, void, unknown>
  loginByWalletMutation: UseMutationResult<User, unknown, void, unknown>
}

const AuthenticationContext = React.createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const [openForgotPassword, setOpenForgotPassword] = React.useState<boolean>(false);
  const [openResetPassword, setOpenResetPassword] = React.useState<boolean>(false);
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);
  const [isResetSuccess, setResetSuccess] = React.useState(false);

  const [loginData, setLoginData] = useState<IFormSignInInput>();
  const [loginError, setLoginError] = useState<string>('');

  const [registerData, setRegisterData] = useState<IFormRegisterInput>();
  const [registerError, setRegisterError] = useState<string>('');

  const [forgotPasswordData, setForgotPasswordData] = useState<IFormForgotPasswordInput>();
  const [forgotPasswordError, setForgotPasswordError] = useState<string>('');

  const [resetPasswordData, setResetPasswordData] = useState<IFormResetPasswordInput>();
  const [resetPasswordError, setResetPasswordError] = useState<string>('');

  const { signMessage, address } = useWalletContext();

  const { event } = useGA4();

  const { isLoading: isPostingLogin, mutate: postLogin } = useMutation(
    async () => { return await apiClient.post(`/accounts/login`, loginData); },
    {
      onSuccess: (res) => {
        // Todo: Handle result and cache token
        console.log(res)
        setOpenSignIn(false);
      },
      onError: (err) => {
        console.log(err)
        setLoginError("Login error")
      },
    }
  );

  const { isLoading: isPostingRegister, mutate: postRegister } = useMutation(
    async () => { return await apiClient.post(`/accounts/register`, registerData); },
    {
      onSuccess: (res) => {
        // Todo: Handle result and cache token
        console.log(res)
        setOpenRegister(false);
        // TODO mock event
        event('Account Sign-up Completed', { campaign: 'Sigil', myria_id: undefined, myria_username: '_mock', user_email: '_mock', wallet_address: '_mock' })
      },
      onError: (err) => {
        console.log(err)
        setRegisterError("Register error")
      },
    }
  );

  const { isLoading: isPostingForgotPassword, mutate: postForgotPassword } = useMutation(
    async () => { return await apiClient.post(`/accounts/forgotPassword`, forgotPasswordData); },
    {
      onSuccess: (res) => {
        setOpenForgotPassword(false);
      },
      onError: (err) => {
        setForgotPasswordError("Email does not exist")
      },
    }
  );

  const registerByWalletMutation = useMutation(
    async () => {
      const message = JSON.stringify({ created_on: new Date(Date.now() + 60000) }); // add 1 minute to current time
      const signature = await signMessage(message);

      if (signature && address) {
        const registerData = {
          wallet_id: address,
          signature,
          message,
        };
        const userRes = await apiClient.post(`/accounts/register/wallet`, registerData).then(res => res.data);

        if (userRes?.status === 'success' && userRes?.data) {
          const user: User = {
            user_id:  userRes.data?.user_id,
            wallet_id: userRes.data?.wallet_id,
          }

          setUser(user);

          return user;
        } else {
          throw new Error('Failed to register user by wallet');
        }
      }
      throw new Error('Signature and wallet address are required to register');
    }
  );

  const loginByWalletMutation = useMutation(
    async () => {
      const message = JSON.stringify({ created_on: new Date(Date.now() + 60000) }); // add 1 minute to current time
      const signature = await signMessage(message);

      if (signature && address) {
        const registerData = {
          wallet_id: address,
          signature,
          message,
        };
        const userRes = await apiClient.post(`/accounts/login/wallet`, registerData).then(res => res.data);

        if (userRes?.status === 'success' && userRes?.data) {
          const user: User = {
            user_id:  userRes.data?.user_id,
            wallet_id: userRes.data?.wallet_id,
          }

          setUser(user);

          return user;
        } else {
          throw new Error('Failed to login user by wallet');
        }
      }
      throw new Error('Signature and wallet address are required to login');
    }
  );

  const { isLoading: isPostingResetPassword, mutate: postResetPassword } = useMutation(
    async () => { return await apiClient.post(`/accounts/resetPassword`, resetPasswordData); },
    {
      onSuccess: (res) => {
        setResetSuccess(true)
      },
      onError: (err) => {
        setResetPasswordError("Can't reset your password")
      },
    }
  );

  const login = () => {
    setOpenSignIn(true);
    setOpenRegister(false);
    setOpenVerifyModal(false);
    setOpenForgotPassword(false);
    setOpenResetPassword(false)
  };

  const register = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
    setOpenVerifyModal(false);
    setOpenForgotPassword(false);
  };

  const forgotPassword = () => {
    setOpenForgotPassword(true)
    setOpenSignIn(false);
    setOpenRegister(false);
  };

  const resetPassword = () => {
    setResetSuccess(false)
    setOpenResetPassword(true)
  }

  const openVerify = (data: IFormSignInInput) => {
    setLoginData(data)
    setOpenVerifyModal(true);
    setOpenSignIn(false);
  };

  const closeVerify = () => {
    setOpenVerifyModal(false);
  };

  const onVerifySuccess = () => {
    setOpenVerifyModal(false);
    setOpenSignIn(true)
    postLogin()
  }

  const doRegister = (data: IFormRegisterInput) => {
    setRegisterData(data)
    postRegister()
  };

  const doForgotPassword = (data: IFormForgotPasswordInput) => {
    setForgotPasswordData(data)
    postForgotPassword()
  };

  const doResetPassword = (data: IFormResetPasswordInput) => {
    setResetPasswordData(data)
    postResetPassword()
  };

  return (
    <AuthenticationContext.Provider
      value={
        {
          user,
          login,
          register,
          forgotPassword,
          resetPassword,
          openVerify,
          doRegister,
          doForgotPassword,
          doResetPassword,
          isPostingLogin,
          isPostingRegister,
          isPostingForgotPassword,
          isPostingResetPassword,
          isResetSuccess,
          loginError,
          registerError,
          forgotPasswordError,
          resetPasswordError,
          registerByWalletMutation,
          loginByWalletMutation,
        }
      }>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
      <ForgotPasswordModal open={openForgotPassword} onClose={() => setOpenForgotPassword(false)} />
      <ResetPasswordModal open={openResetPassword} isResetSuccess={isResetSuccess} onClose={() => setOpenResetPassword(false)} />
      <VerifyModal open={openVerifyModal} onClose={closeVerify} onSuccess={onVerifySuccess} />
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
