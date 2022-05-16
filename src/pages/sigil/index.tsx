import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from 'src/components/Page';
import Dashboard from 'src/components/nodes/sigil/Dashboard';
import SigilStepper from 'src/components/nodes/sigil/SigilStepper';
import ChooseAlliance from 'src/components/nodes/sigil/ChooseAlliance';
import Welcome from 'src/components/nodes/sigil/Welcome';
import WelcomeMobile from 'src/components/nodes/sigil/WelcomeMobile';
import Header from 'src/components/nodes/sigil/Header';
import Sound from 'src/components/nodes/sigil/Sound';
import { soundService, SUPPORT_SOUND } from 'src/sound';
import { useRouter } from 'next/router';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { useAuthenticationContext } from 'src/context/authentication';
import { usePickSigilQuery } from 'src/components/nodes/sigil/ChooseAlliance/useChooseAllianceQuery';

type Step = 0 | 1 | 2;

const Sigil: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const bgSoundRef = React.useRef<HTMLAudioElement | null>(null);
  const [_, setReferralCode] = useLocalStorage<any>(localStorageKeys.referralCode, undefined);
  const { user } = useAuthenticationContext();
  const { sigilProfile } = usePickSigilQuery();

  useEffect(() => {
    setReferralCode(router.query.code);
  }, [router.query.code, setReferralCode]);

  const goToNextStep = useCallback(() => {
    setCurrentStep((currentStep) => {
      if (currentStep === 2) {
        return currentStep;
      }
      return (currentStep + 1) as Step;
    });
  }, []);

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <Welcome onNext={goToNextStep} />;
      case 1:
        return (
          <ChooseAlliance
            onNext={() => {
              goToNextStep();
            }}
          />
        );
      default:
        return <Dashboard />;
    }
  }, [currentStep, goToNextStep]);

  React.useEffect(() => {
    if (!bgSoundRef.current) {
      setTimeout(() => {
        bgSoundRef.current = soundService.playSound(SUPPORT_SOUND.SIGIL_DASHBOARD_BG);
      }, 2000);
    }

    return () => {
      bgSoundRef.current?.pause();
    };
  }, []);

  React.useEffect(() => {
    if (![0, 1].includes(currentStep)) {
      bgSoundRef.current?.pause();
    }
  }, [currentStep]);

  React.useEffect(() => {
    if (user && sigilProfile.data?.alliance) {
      setCurrentStep(2);
    }
  }, [sigilProfile, user]);

  React.useEffect(() => {
    if (!user) {
      setCurrentStep(0);
    }
  }, [user]);

  return (
    <Page headerClassName="hidden" footerClassName="hidden">
      <Header step={currentStep} />

      <div className="md:hidden">
        <WelcomeMobile />
      </div>
      <div className="hidden md:block">
        <div className="relative min-h-screen bg-dark">
          <div className="min-h-[700px]">{content}</div>
          {currentStep !== 2 && (
            <div className="ml-auto mr-auto w-full max-w-[577px]">
              <SigilStepper
                steps={[
                  {
                    title: 'Connect Wallet'
                  },
                  {
                    title: 'Choose Alliance'
                  },
                  {
                    title: 'Claim your NFT reward'
                  }
                ]}
                currentStep={currentStep}
              />
            </div>
          )}
        </div>
      </div>

      {[0, 1].includes(currentStep) && <Sound />}
    </Page>
  );
};

export default Sigil;
