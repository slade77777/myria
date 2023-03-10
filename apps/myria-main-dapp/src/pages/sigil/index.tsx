import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Page from 'src/components/Page';
import Dashboard from 'src/components/sigil/Dashboard';
import SigilStepper from 'src/components/sigil/SigilStepper';
import Welcome from 'src/components/sigil/Welcome';
import WelcomeMobile from 'src/components/sigil/WelcomeMobile';
import Header from 'src/components/sigil/Header';
import Sound from 'src/components/sigil/Sound';
import { soundService, SUPPORT_SOUND } from 'src/sound';
import { useRouter } from 'next/router';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { useAuthenticationContext } from 'src/context/authentication';
import { LoadingStandBy } from 'src/components/Loading';
import { t } from '@lingui/macro';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import Register from 'src/components/sigil/Register';

type Step = 0 | 1 | 2;

const Sigil: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const bgSoundRef = React.useRef<HTMLAudioElement | null>(null);
  const timerBgSoundRef = React.useRef<NodeJS.Timeout | null>(null);
  const [_, setReferralCode] = useLocalStorage<any>(localStorageKeys.referralCode, undefined);
  const { user, userProfileQuery } = useAuthenticationContext();
  const { code, status, message } = router.query;

  useEffect(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (code) {
      setReferralCode(code);
    }
    // we need to disable react-hooks/exhaustive-deps because
    // adding setReferralCode will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (status && message) {
      router.replace('/sigil', undefined, { shallow: true });
      toast(message, { type: status === 'error' ? 'error' : 'success' });
    }
  }, [status, message, router]);

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
        return <Register />;
      default:
        return <Dashboard />;
    }
  }, [currentStep, goToNextStep]);

  React.useEffect(() => {
    if (currentStep === 0) {
      if (!bgSoundRef.current) {
        timerBgSoundRef.current = setTimeout(() => {
          bgSoundRef.current = soundService.playSound(SUPPORT_SOUND.SIGIL_DASHBOARD_BG, {
            loop: true
          });
        }, 2000);
      }
    } else {
      timerBgSoundRef.current && clearTimeout(timerBgSoundRef.current);
      bgSoundRef.current?.pause();
    }

    return () => {
      timerBgSoundRef.current && clearTimeout(timerBgSoundRef.current);
      bgSoundRef.current?.pause();
    };
  }, [currentStep]);

  React.useEffect(() => {
    if (user && user.user_name && user.credits) {
      setCurrentStep(2);
      return;
    }

    if (user?.user_id) {
      setCurrentStep(1);
    }

    if (!user?.user_id) {
      setCurrentStep(0);
    }
  }, [user]);

  const isLoading = !userProfileQuery.isFetched && userProfileQuery.isFetching && currentStep === 0;

  return (
    <>
      <div className={`relative ${currentStep === 1 ? 'min-w-[1300px]' : ''}`}>
        {isLoading && (
          <div className="bg-dark/10 absolute inset-0 z-10 flex w-full items-center justify-center text-white">
            <LoadingStandBy />
          </div>
        )}
        <Page headerClassName="hidden" footerClassName="hidden" includeHeader={false}>
          <Header step={currentStep} />

          <div className="md:hidden">
            <WelcomeMobile />
          </div>
          <div className="hidden md:block">
            <div
              className={clsx('relative flex min-h-screen flex-col ', {
                "bg-dark bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat":
                  isLoading
              })}>
              {!isLoading && <div>{content}</div>}
              {currentStep === 0 && (
                <div className="absolute bottom-1 left-1/2 ml-auto mr-auto mt-auto w-full max-w-[577px] -translate-x-1/2">
                  <SigilStepper
                    steps={[
                      {
                        title: t`Connect Wallet`
                      },
                      {
                        title: t`Claim your NFT reward`
                      }
                    ]}
                    currentStep={currentStep}
                  />
                </div>
              )}
            </div>
          </div>

          {currentStep === 0 && <Sound />}
        </Page>
      </div>
    </>
  );
};

export default Sigil;
