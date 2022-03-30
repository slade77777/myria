import React, { useCallback, useMemo, useState } from 'react';
import Page from 'src/components/Page';
import Dashboard from 'src/components/nodes/sigil/Dashboard';
import SigilStepper from 'src/components/nodes/sigil/SigilStepper';
import ChooseAlliance from 'src/components/nodes/sigil/ChooseAlliance';
import Welcome from 'src/components/nodes/sigil/Welcome';
import WelcomeMobile from 'src/components/nodes/sigil/WelcomeMobile';
import Header from 'src/components/nodes/sigil/Header';
import { isMobile } from 'src/utils';
import Footer from 'src/components/nodes/sigil/Footer';
import Sound from 'src/components/nodes/sigil/Sound';

type Step = 0 | 1 | 2;

const Sigil: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [hoveredSigil, setHoveredSigil] = useState<string | null>(null);

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
        return <ChooseAlliance onHoverSigil={setHoveredSigil} onNext={goToNextStep} />;
      default:
        return <Dashboard />;
    }
  }, [currentStep, goToNextStep]);

  const soundUrl = React.useMemo(() => {
    switch(currentStep) {
      case 0:
        return '/sounds/sigil_bg.wav';
      case 1:
        if (hoveredSigil) {
          return '/sounds/sigil.wav';
        }
        break;
      default:
        return undefined;
    }
  }, [currentStep, hoveredSigil]);

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

      <Sound soundUrl={soundUrl} />
    </Page>
  );
};

export default Sigil;
