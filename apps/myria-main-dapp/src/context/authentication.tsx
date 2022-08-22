import React, { useContext, useEffect, useState } from 'react';
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
import apiClient, { mapError, IResponseError, noCacheApiClient } from 'src/client';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { AxiosError } from 'axios';
import { Trans } from '@lingui/macro';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { useGA4 } from 'src/lib/ga';
import { useWalletContext } from './wallet';
import { toast } from 'react-toastify';
import { AllianceName } from 'src/types/sigil';

export type User = {
  user_id: string;
  wallet_id?: string;
  last_name?: string;
  first_name?: string;
  user_name?: string;
  email?: string;
  alliance?: AllianceName;
  credits?: number;
  date_registered?: Date;
};

const VerifyModal = ({
  open,
  onClose,
  onSuccess
}: {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}) => {
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

const ResetPasswordModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={'Create a new password'} className="shadow-[0_0_40px_10px_#0000004D]">
        <ResetPassword />
      </Modal.Content>
    </Modal>
  );
};

const ResetSuccessdModal = ({
  open,
  onClose,
  onLogin
}: {
  open: boolean;
  onClose?: () => void;
  onLogin?: () => void;
}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="our password was reset" className="shadow-[0_0_40px_10px_#0000004D]">
        <div className="px-8">
          <button className="btn-lg btn-primary my-8 w-full" onClick={onLogin}>
            <Trans>Log in</Trans>
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

const RegisterSuccessdModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Email confirmation sent" className="shadow-[0_0_40px_10px_#0000004D]">
        <div className="px-8">
          <p className="body text-light my-8">
            Please check your inbox and follow the link to confirm your email.
          </p>
        </div>
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
  logout: () => void;
  openVerify: (data: IFormSignInInput) => void;
  doRegister: (data: IFormRegisterInput) => void;
  doForgotPassword: (data: IFormForgotPasswordInput) => void;
  doResetPassword: (data: IFormResetPasswordInput) => void;
  isPostingLogin: boolean;
  isPostingRegister: boolean;
  isPostingForgotPassword: boolean;
  isPostingResetPassword: boolean;
  loginError: string;
  registerError: IResponseError | undefined;
  forgotPasswordError: string;
  resetPasswordError: string;
  registerByWalletMutation: UseMutationResult<User, unknown, void, unknown>;
  loginByWalletMutation: UseMutationResult<User, unknown, void, unknown>;
  userProfileQuery: UseQueryResult<User | null, unknown>;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

const getSignatureMessage = (ts: number) => {
  return `Welcome to Myria!\n\nSelect 'Sign' to create and sign in to your Myria account.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\n${JSON.stringify(
    { created_on: ts }
  )}`;
};

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [referalCode] = useLocalStorage(localStorageKeys.referralCode, undefined);
  const [user, setUser] = React.useState<User | undefined>();
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const [openForgotPassword, setOpenForgotPassword] = React.useState<boolean>(false);
  const [openResetPassword, setOpenResetPassword] = React.useState<boolean>(false);
  const [openVerifyModal, setOpenVerifyModal] = React.useState(false);
  const [openResetSuccess, setOpenResetSuccess] = React.useState(false);
  const [openRegisterSuccess, setOpenRegisterSuccess] = React.useState(false);

  const [loginData, setLoginData] = useState<IFormSignInInput>();
  const [loginError, setLoginError] = useState<string>('');

  const [registerData, setRegisterData] = useState<IFormRegisterInput>();
  const [registerError, setRegisterError] = useState<IResponseError>();

  const [forgotPasswordData, setForgotPasswordData] = useState<IFormForgotPasswordInput>();
  const [forgotPasswordError, setForgotPasswordError] = useState<string>('');

  const [resetPasswordData, setResetPasswordData] = useState<IFormResetPasswordInput>();
  const [resetPasswordError, setResetPasswordError] = useState<string>('');

  const { signMessage, address } = useWalletContext();

  const { event } = useGA4();

  const { isLoading: isPostingLogin, mutate: postLogin } = useMutation(
    async () => {
      const body = {
        login: loginData?.email,
        password: loginData?.password
      };
      return await apiClient.post(`/accounts/login`, body);
    },
    {
      onSuccess: (res) => {
        const user = res.data.data;
        setOpenSignIn(false);
        setUser(user);
      },
      onError: (err) => {
        console.log(err);
        setLoginError('Username or password is incorrect');
      }
    }
  );

  const logoutMutation = useMutation(async () => {
    try {
      await apiClient.post(`/accounts/logout`);
    } catch (err) {}
    window.location.reload();
  });

  const { isLoading: isPostingRegister, mutate: postRegister } = useMutation(
    async () => {
      const body = {
        referral_code: referalCode,
        redirect: 0,
        first_name: registerData?.firstName,
        last_name: registerData?.lastName,
        username: registerData?.username,
        password: registerData?.password,
        email: registerData?.email
      };
      return await apiClient.post(`/accounts/link`, body);
    },
    {
      onSuccess: (res) => {
        const user = res?.data?.data || {};
        setRegisterError(undefined);
        setOpenRegisterSuccess(true);
        setOpenRegister(false);
        event('Account Sign-up Completed', {
          campaign: 'Sigil',
          myria_id: user.user_id,
          myria_username: user.username,
          user_email: user.email,
          wallet_address: user.wallet_id
        });
      },
      onError: (err: AxiosError) => {
        setRegisterError(mapError(err));
      }
    }
  );

  const { isLoading: isPostingForgotPassword, mutate: postForgotPassword } = useMutation(
    async () => {
      return await apiClient.post(`/accounts/forgotPassword`, forgotPasswordData);
    },
    {
      onSuccess: (res) => {
        setOpenForgotPassword(false);
      },
      onError: (err) => {
        setForgotPasswordError('Email does not exist');
      }
    }
  );

  const registerByWalletMutation = useMutation(async () => {
    const message = JSON.stringify({ created_on: new Date(Date.now() + 60000) }); // add 1 minute to current time
    const signature = await signMessage(message);

    if (signature && address) {
      const registerData = {
        wallet_id: address,
        signature,
        message
      };
      const userRes = await apiClient
        .post(`/accounts/register/wallet`, registerData)
        .then((res) => res.data);

      if (userRes?.status === 'success' && userRes?.data) {
        const user: User = {
          user_id: userRes.data?.user_id,
          wallet_id: userRes.data?.wallet_id
        };
        toast('Register success', { type: 'success' });
        return user;
      } else {
        toast('Register failed, please try again.', { type: 'error' });
        throw new Error('Failed to register user by wallet');
      }
    }
    throw new Error('Signature and wallet address are required to register');
  });

  const loginByWalletMutation = useMutation(async () => {
    const timestamp = await apiClient.get(`/time`).then((res) => res.data?.data?.time);

    const message = getSignatureMessage(timestamp);
    const signature = await signMessage(message);

    if (signature && address) {
      const registerData = {
        wallet_id: address,
        signature,
        message
      };
      const userRes = await apiClient
        .post(`/accounts/login/wallet`, registerData)
        .then((res) => res.data);

      if (userRes?.status === 'success' && userRes?.data) {
        const user: User = {
          user_id: userRes.data?.user_id,
          wallet_id: userRes.data?.wallet_id
        };

        userProfileQuery.refetch();
        toast('Login success', { type: 'success' });
        return user;
      } else {
        toast('Login failed, please try again.', { type: 'error' });
        throw new Error('Failed to login user by wallet');
      }
    }
    throw new Error('Signature and wallet address are required to login');
  });

  const { isLoading: isPostingResetPassword, mutate: postResetPassword } = useMutation(
    async () => {
      return await apiClient.post(`/accounts/resetPassword`, resetPasswordData);
    },
    {
      onSuccess: (res) => {
        setOpenResetSuccess(true);
      },
      onError: (err) => {
        setResetPasswordError("Can't reset your password");
      }
    }
  );

  const login = () => {
    setOpenSignIn(true);
    setOpenRegister(false);
    setOpenVerifyModal(false);
    setOpenForgotPassword(false);
    setOpenResetPassword(false);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const register = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
    setOpenVerifyModal(false);
    setOpenForgotPassword(false);
  };

  const forgotPassword = () => {
    setOpenForgotPassword(true);
    setOpenSignIn(false);
    setOpenRegister(false);
  };

  const resetPassword = () => {
    setOpenResetSuccess(false);
    setOpenResetPassword(true);
  };

  const openVerify = (data: IFormSignInInput) => {
    setLoginData(data);
    setOpenVerifyModal(true);
    setOpenSignIn(false);
  };

  const closeVerify = () => {
    setOpenVerifyModal(false);
  };

  const onVerifySuccess = () => {
    setOpenVerifyModal(false);
    setOpenSignIn(true);
    postLogin();
  };

  const doRegister = (data: IFormRegisterInput) => {
    setOpenRegisterSuccess(false);
    setRegisterData(data);
    postRegister();
  };

  const doForgotPassword = (data: IFormForgotPasswordInput) => {
    setForgotPasswordData(data);
    postForgotPassword();
  };

  const doResetPassword = (data: IFormResetPasswordInput) => {
    setResetPasswordData(data);
    postResetPassword();
  };

  const userProfileQuery = useQuery(
    'getUserProfile',
    () =>
      noCacheApiClient.get('sigil/users/profile').then((res) => {
        const data = res.data?.data;
        if (data) {
          const user: User = {
            user_id: data.user_id,
            credits: data.credits,
            alliance: data.alliance as AllianceName,
            date_registered: new Date(data.date_registered),
            wallet_id: data.wallet_id,
            user_name: data.user_name,
            email: data.email
          };
          setUser(user);
          return user;
        }

        return null;
      }),
    { retry: false }
  );

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        openVerify,
        doRegister,
        doForgotPassword,
        doResetPassword,
        isPostingLogin,
        isPostingRegister,
        isPostingForgotPassword,
        isPostingResetPassword,
        loginError,
        registerError,
        forgotPasswordError,
        resetPasswordError,
        registerByWalletMutation,
        loginByWalletMutation,
        userProfileQuery
      }}>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
      <RegisterSuccessdModal
        open={openRegisterSuccess}
        onClose={() => setOpenRegisterSuccess(false)}
      />
      <ForgotPasswordModal open={openForgotPassword} onClose={() => setOpenForgotPassword(false)} />
      <ResetPasswordModal open={openResetPassword} onClose={() => setOpenResetPassword(false)} />
      <ResetSuccessdModal
        open={openResetSuccess}
        onClose={() => setOpenResetSuccess(false)}
        onLogin={login}
      />
      <VerifyModal open={openVerifyModal} onClose={closeVerify} onSuccess={onVerifySuccess} />
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
