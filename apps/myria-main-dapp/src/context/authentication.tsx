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
import apiClient, {
  mapError,
  IResponseError,
  noCacheApiClient,
  campaignApiClient
} from 'src/client';

import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { AxiosError, AxiosResponse } from 'axios';
import { Trans } from '@lingui/macro';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { useGA4 } from 'src/lib/ga';
import { useWalletContext } from './wallet';
import { toast } from 'react-toastify';
import { AllianceName } from 'src/types/sigil';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { MyriaUser, RegisterData, UserAirDop } from 'src/types/campaign';
import { useL2WalletContext } from './l2-wallet';
import { useAirdropCampaign } from './campaignContext';
import { UserData } from 'myria-core-sdk/dist/types';

export interface User {
  user_id: string;
  wallet_id?: string;
  last_name?: string;
  first_name?: string;
  user_name?: string;
  email?: string;
  alliance?: AllianceName;
  credits?: number;
  date_registered?: Date;
  access_token?: string;
}

export interface UserWallet {
  id: string;
  starkKey: string;
  walletAddress: string;
  email: string;
  verifiedAt: string;
  username: string;
  referrerId: string;
  allianceId: string;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
}
interface ImissionCampaign {
  actionTitle: string;
  campaignId: number;
  code: string;
  description: string;
  missionId: number;
  order: number;
  point: number;
  repetitionLimit: number;
  repetitionType: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImissionProgress {
  campaignId: string;
  code: string;
  earnedPoints: number;
  missionCampaign: ImissionCampaign;
  missionId: number;
  performedTimes: number;
  remainingAction: number;
  status: string;

  startedAt: string;
  createdAt: string;
}
interface ICampaign {
  id: string;
  code: string;
  endedAt: string;
  missionProgress: ImissionProgress[];
  name: string;
  status: string;
  startedAt: string;
  createdAt: string;
}

export interface UserCampaign extends User {
  campaign: ICampaign;
  campaignId: string;
  rewards: [];
  user: User;
  userId: number;
  availablePoints: number;
}

export type Account = {
  normalized_email: string;
  email: string;
  updated_on: string;
  user_roles: string[];
  user_id: string;
  last_name: string;
  first_name: string;
  searchable_username: string;
  username: string;
  wallet_id: string;
  created_on: string;
  last_activity: string;
  hasPassword?: boolean;
  image_url?: string;
};

export type AccountRegister = {
  user_id: string;
  wallet_id: string;
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
  userCampaign: UserCampaign | undefined;
  nextChooseAlliance: boolean;
  idUserCampaign: number | undefined;
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
  loginCampaignByWalletMutation: UseMutationResult<UserAirDop, unknown, void, unknown>;
  userProfileQuery: UseQueryResult<User | null, unknown>;
  accountProfileQuery: UseQueryResult<Account | null, unknown>;
  account?: Account;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>(
  {} as IAuthenticationContext
);

const getSignatureMessage = (ts: number) => {
  return `Welcome to Myria!\n\nSelect 'Sign' to create and sign in to your Myria account.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\n${JSON.stringify(
    { created_on: ts }
  )}`;
};

interface IProps {
  children: React.ReactNode;
  isAirDrop: boolean | false;
}

export const AuthenticationProvider: React.FC<IProps> = ({ children, isAirDrop }) => {
  const [referalCode] = useLocalStorage(localStorageKeys.referralCode, undefined);
  const [user, setUser] = React.useState<User | undefined>();
  const [idUserCampaign, setIdUserCampaign] = React.useState<number | undefined>();
  console.log(idUserCampaign);

  const [userCampaign, setUserCampaign] = React.useState<UserCampaign | undefined>();
  const [nextChooseAlliance, setNextChooseAlliance] = React.useState<boolean>(false);
  const [account, setAccount] = React.useState<Account | undefined>();
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

  const { campaignId } = useAirdropCampaign();

  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [idCampaign, setIdCampaign] = useLocalStorage(localStorageKeys.idCampaign, '');

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
    } catch (err) { }
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

  const registerUserCampaign = async (
    address: string,
    userWallet_id: string,
    username: string | undefined,
    email: string | undefined,
    userData: Promise<UserData>
  ) => {
    const reqUserData = {
      starkKey: (await userData).starkKey,
      walletAddress: address.toLowerCase(),
      accountId: userWallet_id,
      username: username || undefined,
      email: email || undefined
    };
    return await campaignApiClient.post(`/users`, reqUserData).then((res) => res.data);
  };

  //Regiter Campaign
  const registerCampaignByWallet = async (userDataRegister: string) => {
    const message = JSON.stringify({ created_on: new Date(Date.now() + 60000) }); // add 1 minute to current time
    const signature = await signMessage(message);

    // Create user in campaign services
    if (signature && address) {
      const registerData = {
        userId: userDataRegister,
        campaignId: campaignId
      };
      const userRes = await campaignApiClient
        .post(`/users/register-campaign`, registerData)
        .then((res) => res.data);

      if (userRes?.status === 'success' && userRes?.data) {
        const user: MyriaUser = {
          user_id: userRes.data?.userId,
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
  };

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
          wallet_id: userRes.data?.wallet_id,
          access_token: userRes.data?.access_token
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

  const loginCampaignByWalletMutation = useMutation(async () => {
    const timestamp = await apiClient.get(`/time`).then((res) => res.data?.data?.time);
    const message = getSignatureMessage(timestamp);
    const signature = await signMessage(message);
    const moduleFactory = await getModuleFactory();
    const commonModule = moduleFactory.getCommonModule();
    const userModule = moduleFactory.getUserManager();

    if (address === undefined) throw new Error('Address cant be empty');

    let userRes: AxiosResponse | null;
    let registerData: RegisterData;

    if (signature) {
      const isCheckFirstTimeUser =
        localStorage.getItem(localStorageKeys.firstTimeWallet) === 'true';

      const loginAccountWallet = async () => {
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
              wallet_id: userRes.data?.wallet_id,
              access_token: userRes.data?.access_token
            };
            setUser(user);
            toast('Login success', { type: 'success' });
            return user;
          } else {
            toast('Login failed, please try again.', { type: 'error' });
            throw new Error('Failed to login user by wallet');
          }
        }
      };
      if (!isCheckFirstTimeUser) {
        // Normal users from wallet
        return campaignApiClient.get(`/users/wallet-address/${address}?${campaignId}`).then((res) => {
          //User registered campaign
          if (res.data.data.allianceId) {
            setIdCampaign(res.data.data.id.toString());
            setIdUserCampaign(res.data.data.id);
            userProfileQuery.refetch();
            return res.data.data;
          }
          else {
            setNextChooseAlliance(true);
            setIdCampaign(res.data.data.id.toString());
            setIdUserCampaign(res.data.data.id);
          }
        }).catch(async () => {      //No user in campaign
          //Create user in campaign service
          const userID = await loginAccountWallet();

          //Register user, userbyWallet
          const userData = userModule.getUserByWalletAddress(address);
          const dataUserCampaign = await registerUserCampaign(
            address,
            userID?.user_id || '',
            userID?.user_name || '',
            userID?.email || '',
            userData
          );
          const dataRegisterCampaign = await registerCampaignByWallet(dataUserCampaign.id);

          //Push user to select Alliance
          setIdCampaign(dataRegisterCampaign.user_id.toString())
          setIdUserCampaign(dataRegisterCampaign.user_id);
          setNextChooseAlliance(true);
        });
        // Normal user has registered campaign
        // getUserInCompaignByWalletAddress in campaign service

        // Normal user has not register campaign
        // registerCampaignByWallet
      } else {
        // New fresh user
        // Step 1
        // User must have the account infor in the account service
        const userID = await loginAccountWallet();
        //  (assumed it is done loginByWalletMutation.mutate(); in Welcome components)

        // Step 2
        // Register user in L2 wallet
        // Generate stark key call to L2 services
        // UserRes = await campaignApiClient.post(`/users/l2/wallet`, registerData).then((res) => res)

        // Signature genarte stark key
        let newStarkKey = await commonModule.generateStarkKey(address);

        //Set LocalStorage Local StarkKey and WalletAddress
        setLocalStarkKey(newStarkKey);
        setWalletAddress(address);
        const signatureData = {
          ethAddress: address,
          starkKey: '0x' + newStarkKey
        };

        const starkSignature = await commonModule.generateStarkSignatureForRegisterUser(
          signatureData
        );
        let isReferCode = '';
        const paramsString = window.location.search;
        const searchParams = new URLSearchParams(paramsString);
        if (searchParams.get('referCode')) {
          isReferCode = searchParams.get('referCode') || '';
        }
        if (userID) {
          registerData = {
            starkKey: '0x' + newStarkKey,
            walletAddress: address,
            referrerId: isReferCode?.length ? isReferCode : undefined,
            signature: starkSignature
          };

          // Step 3
          // Register user in Campaign mutation
          // const user = await registerCampaignByWallet();
          userRes = await campaignApiClient
            .post(`/users/l2/wallet`, registerData)
            .then((res) => res);
          const dataRegisterCampaign = await registerCampaignByWallet(userRes?.data.data.id || '');
          // set user choose alliance
          setIdCampaign(dataRegisterCampaign.user_id.toString())
          setIdUserCampaign(dataRegisterCampaign.user_id);
          setNextChooseAlliance(true);
        } else {
          userRes = null;
        }
      }

      if (userRes && userRes.status === 201 && userRes.data.data) {
        const user: UserAirDop = userRes.data.data;
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
    () => {
      if (isAirDrop) {
        if (!campaignId || !idCampaign) return null;
        return campaignApiClient
          .get(`/users/${idCampaign}/campaign-id/${campaignId}`)
          .then((res) => {
            const data = res.data?.data;
            if (data) {
              const user: User = {
                user_id: data.user_id,
                alliance: data.alliance as AllianceName,
                date_registered: new Date(data.date_registered),
                wallet_id: data.walletAddress,
                user_name: data.user_name,
                email: data.email
              };
              const responseCampaign: UserCampaign = data;
              setUserCampaign(responseCampaign);
              return user;
            }
            return null;
          });
      } else {
        return noCacheApiClient.get('sigil/users/profile').then((res) => {
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
        });
      }
    },
    {
      retry: false,
      refetchInterval: isAirDrop ? (idUserCampaign ? 5000 : 2000) : false
    }
  );

  const accountProfileQuery = useQuery(
    'getAccount',
    () =>
      noCacheApiClient.get('accounts/users').then((res) => {
        const data = res.data?.data;
        if (data) {
          setAccount(data);
          return data;
        }

        return null;
      }),
    { retry: 1 }
  );

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        userCampaign,
        nextChooseAlliance,
        idUserCampaign: idUserCampaign,
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
        loginCampaignByWalletMutation,
        userProfileQuery,
        accountProfileQuery,
        account
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
