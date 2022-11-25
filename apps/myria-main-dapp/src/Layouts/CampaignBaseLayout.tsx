import React, { SetStateAction, useEffect } from 'react';
import Page from 'src/components/Page';
import Header from 'src/components/sigil/Header';
import { LoadingStandBy } from 'src/components/Loading';
import clsx from 'clsx';
import WelcomeMobile from 'src/components/sigil/WelcomeMobile';
import Sound from 'src/components/sigil/Sound';
import { useAuthenticationContext } from 'src/context/authentication';
import ChooseAllianceStepper from 'src/components/AirDrop/ChooseAlliance/Stepper';
import { Step } from 'src/pages/airdrop';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { useWalletContext } from 'src/context/wallet';

interface Props {
  children: React.ReactNode;
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<Step>>;
}

const CamPaignBaseLayout: React.FC<Props> = ({ children, currentStep, setCurrentStep }) => {
  const { userProfileQuery, firstCheckUserCampaign, userCampaign } = useAuthenticationContext();
  const { address } = useWalletContext();
  const [userCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');

  const isLoading =
    !userProfileQuery.isFetched &&
    userProfileQuery.isFetching &&
    currentStep === 0 &&
    !userCampaign;

  useEffect(() => {
    let clearTimeOut: NodeJS.Timeout;
    //Set User to content
    if (userCampaign && userCampaignId && address && walletAddress) {
      setCurrentStep(3);
      //Set User To Welcome
    } else if (!address && !walletAddress && !localStarkKey) {
      setCurrentStep(1);

      //Set User To Welcome when have address wallet starkkey but not userCampaign waiting 2s after call API or set UserCampaign Id
    } else if (address && walletAddress && localStarkKey && !userCampaign) {
      clearTimeOut = setTimeout(() => {
        if (
          //Check fetching fistuserCampaign
          (firstCheckUserCampaign.isFetched &&
            firstCheckUserCampaign.data &&
            userCampaignId &&
            !userCampaign) ||
          (userProfileQuery.isFetched && userProfileQuery.data && userCampaignId && !userCampaign) //Check fetched user and have userCampaignId on localstorage but not userCampain
        )
          return clearTimeOut;
        setCurrentStep(1);
      }, 3000);
    }
    return () => {
      clearTimeOut && clearTimeout(clearTimeOut);
    };
  }, [userCampaignId, userCampaign, address]);
  return (
    <>
      <div className={`relative h-[100vh]`}>
        {/* <div className={`relative ${currentStep === 1 ? 'min-w-[1300px]' : ''}`}> */}
        {isLoading && (
          <div className="bg-dark/10 absolute inset-0 z-10 flex h-[100vh] w-full items-center justify-center text-white">
            <LoadingStandBy />
          </div>
        )}
        <Page headerClassName="hidden" footerClassName="hidden" includeHeader={false}>
          <Header step={currentStep} isAirDrop={true} />
          <div className="md:hidden">
            <WelcomeMobile />
          </div>
          <div className="hidden md:block">
            <div
              className={clsx('relative flex min-h-screen flex-col ', {
                "bg-dark bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat":
                  isLoading || currentStep === 0
              })}>
              {!isLoading && <div>{children}</div>}
              {currentStep === 1 && <ChooseAllianceStepper currentStep={currentStep - 1} />}
            </div>
          </div>

          {0 < currentStep && currentStep < 3 && <Sound />}
        </Page>
      </div>
    </>
  );
};

export default CamPaignBaseLayout;
