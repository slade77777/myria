import React, { FC, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Trans } from '@lingui/macro';
import { useAuthenticationContext } from '../../context/authentication';
import useLocalStorage from '../../hooks/useLocalStorage';
import { localStorageKeys } from '../../configs';
import { useWalletContext } from '../../context/wallet';
import { useL2WalletContext } from '../../context/l2-wallet';

const availableGames = ['moonville-farms', 'metarush'];

const PlayButton: FC<{ gameUrl?: string }> = ({ gameUrl }) => {
  const router = useRouter();
  const { id, redirect_url } = router.query;
  const { user, loginByWalletMutation } = useAuthenticationContext();
  const { connectL2Wallet } = useL2WalletContext();
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const { address, onConnect } = useWalletContext();

  const onConnectWallet = async () => {
    onConnect();
    await connectL2Wallet();
    loginByWalletMutation.mutate();
  };

  const showConnectedWallet = React.useMemo(() => {
    // First time registration
    if (walletAddress && address && (!user || !user?.wallet_id)) {
      return true;
    }

    // Normal non-first time user
    if (
      address &&
      user &&
      address?.toLowerCase() === user?.wallet_id?.toLowerCase() &&
      localStarkKey
    ) {
      return true;
    }
    return false;
  }, [address, localStarkKey, user, walletAddress]);

  const playGame = useCallback(() => {
    const userData = loginByWalletMutation.data;
    if (
      redirect_url &&
      typeof redirect_url === 'string' &&
      id === 'metarush' &&
      userData?.access_token
    ) {
      return window.open(`${redirect_url}?q=${userData.access_token}`, '_blank');
    }
    if (gameUrl && id === 'moonville-farms') {
      return window.open(gameUrl, '_blank');
    }
  }, [gameUrl, id, loginByWalletMutation.data, redirect_url]);

  if (typeof id === 'string' && availableGames.includes(id.toLowerCase())) {
    if (
      !loginByWalletMutation.isError &&
      !loginByWalletMutation.isLoading &&
      walletAddress &&
      showConnectedWallet
    ) {
      return (
        <button className="btn-lg btn-primary w-full justify-center" onClick={playGame}>
          <Trans>PLAY</Trans>
        </button>
      );
    } else {
      return (
        <button className="btn-lg btn-primary w-full justify-center" onClick={onConnectWallet}>
          <Trans>CONNECT TO PLAY</Trans>
        </button>
      );
    }
  }

  return (
    <button className="btn-lg btn-primary w-full justify-center">
      <Trans>IN DEVELOPMENT</Trans>
    </button>
  );
};

export default memo(PlayButton);
