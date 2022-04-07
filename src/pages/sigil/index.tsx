import React, { useCallback, useMemo, useState } from 'react';
import Page from 'src/components/Page';
import Dashboard from 'src/components/nodes/sigil/Dashboard';
import SigilStepper from 'src/components/nodes/sigil/SigilStepper';
import ChooseAlliance from 'src/components/nodes/sigil/ChooseAlliance';
import Welcome from 'src/components/nodes/sigil/Welcome';
import WelcomeMobile from 'src/components/nodes/sigil/WelcomeMobile';
import Header from 'src/components/nodes/sigil/Header';
import { isMobile } from 'src/utils';
import Sound from 'src/components/nodes/sigil/Sound';
import { soundService, SUPPORT_SOUND } from 'src/sound';

type Step = 0 | 1 | 2;

const Sigil: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const bgSoundRef = React.useRef<HTMLAudioElement|null>(null);

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
        return <ChooseAlliance onNext={() => {
          goToNextStep();
        }} />;
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
    }
  }, []);

  React.useEffect(() => {
    if (![0, 1].includes(currentStep)) {
      bgSoundRef.current?.pause();
    }
  }, [currentStep]);

  return (
    <Page headerClassName="hidden" footerClassName="hidden">
      <Header step={currentStep} />

      {isMobile() ? (
        <WelcomeMobile />
      ) : (
        <div className="relative min-h-screen bg-dark">
          {currentStep !== 2 && (
            <div className="absolute top-[calc(100vh-28px)] left-1/2 z-[2] w-full max-w-[577px] -translate-y-full -translate-x-1/2">
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
          <div className="min-h-screen">{content}</div>
        </div>
      )}

      {
        [0, 1].includes(currentStep) && (<Sound />)
      }
    </Page>
  );
};

export default Sigil;
