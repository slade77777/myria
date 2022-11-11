import { Trans } from '@lingui/macro'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Step } from 'src/pages/airdrop';

import Input from 'src/components/Input'
import Button from 'src/components/core/Button';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import { useL2WalletContext } from 'src/context/l2-wallet';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { useGA4 } from 'src/lib/ga';
import { useRouter } from 'next/router';

interface IProp {
    address: string;
    installedWallet: boolean | string;
    isSupportedBrowser: boolean;
    onNext: () => void;
    setCurrentStep?: React.Dispatch<React.SetStateAction<Step>> | undefined;
}

const LeftSectionWelcome: React.FC<IProp> = ({ installedWallet, isSupportedBrowser, onNext, setCurrentStep }) => {
    const [checkedInput, setCheckedInput] = useState<boolean>(false);
    const [continueFunction, setContinueFunction] = useState<boolean>(false);
    const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
    const [userCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');
    const router = useRouter()

    const { event } = useGA4();
    const { connectL2Wallet } = useL2WalletContext();
    const { address, onConnectCompaign, disconnect } = useWalletContext();
    const {
        userCampaign,
        userProfileQuery,
        nextChooseAlliance,
        loginCampaignByWalletMutation,
        setNextChooseAlliance
    } = useAuthenticationContext();

    useEffect(() => {
        if (nextChooseAlliance) {
            onNext();
            return;
        }
        if (setCurrentStep && userCampaign) {
            // check Selected Alliance from user
            setCurrentStep(2); // set Step to federatiton
            return;
        }
    }, [address, onNext, userProfileQuery, nextChooseAlliance]);

    useEffect(() => {
        if (continueFunction) {
            setContinueFunction(false)
        }
    }, [loginCampaignByWalletMutation.error])
    const handleClick = async () => {
        onConnectCompaign('AirDrop');
        connectL2Wallet();
        event('Connect Wallet Selected', { campaign: 'Sigil' });
        loginCampaignByWalletMutation.mutate();
        setContinueFunction(true)
    };

    const handleClickContinue = () => {
        setNextChooseAlliance(true);
    }

    const isLoadingLogin = () => {
        return (
            loginCampaignByWalletMutation.isLoading ||
            (loginCampaignByWalletMutation.isSuccess && !walletAddress) ||
            (!userProfileQuery.data && loginCampaignByWalletMutation.isLoading) ||
            userProfileQuery.isFetching
        );
    };


    return (
        <div className={clsx(`w-[480px]`)}>
            <h1 className="text-[28px] font-bold leading-[34px]">
                <Trans>
                    Welcome treasure hunter, <br />
                    your Sigil Key NFTs await
                </Trans>
            </h1>
            <p className="text-[#9CA3AF] mt-8 text-[16px] leading-6">
                <Trans>
                    Choose your alliance and earn points to uncover Sigil key fragments hidden throughout the Myriaverse. Only those who possess a key can unlock the mysterious Alliance boxes.
                </Trans>
                <br />
                <span className={clsx(`text-primary/6`)}>Read more here</span>
            </p>
            <div className={clsx(`flex align-middle mt-[22px]`)}>
                <Input
                    className={clsx(`h-4 w-4 mr-2`)}
                    type="checkbox"
                    onChange={() => setCheckedInput(!checkedInput)}
                />
                <p className={clsx(`text-light leading-[21px]`)}>
                    <span>
                        I have read and accept the &nbsp;
                    </span>
                    <span onClick={() => router.push('/airdrop/terms-conditions/')} className={clsx(`text-primary/6 cursor-pointer hover:opacity-90`)}>
                        terms and conditions
                    </span>
                </p>
            </div>
            {installedWallet === true && isSupportedBrowser && (
                (userCampaignId && checkedInput) ? (<Button
                    onClick={handleClickContinue}
                    className="btn-lg btn-primary mt-10 flex h-[40px] w-[194px] items-center justify-center p-0">
                    {walletAddress && userCampaignId && checkedInput && <Trans>CONTINUE</Trans>}
                </Button>) :
                    (<Button
                        loading={isLoadingLogin() || (checkedInput && continueFunction)}
                        disabled={isLoadingLogin() || (continueFunction)}
                        onClick={handleClick}
                        className={clsx(`btn-lg btn-primary mt-10 flex h-[40px] items-center justify-center px-7`)}
                        pandingRight='pr-0'
                    >
                        {<Trans>CONNECT WALLET</Trans>}
                    </Button>)
            )}
        </div>
    )
}

export default LeftSectionWelcome