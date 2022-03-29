import React, { useCallback, useMemo, useState } from 'react';
import Page from '../components/Page';
import Dashboard from 'src/components/nodes/sigil/Dashboard';
import SigilStepper from 'src/components/nodes/sigil/SigilStepper';
import ChooseAlliance from 'src/components/nodes/sigil/ChooseAlliance';
import Welcome from 'src/components/nodes/sigil/Welcome';
import Header from 'src/components/nodes/sigil/Header';

type Step = 0 | 1 | 2;
const Sigil: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

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
        return <ChooseAlliance onNext={goToNextStep} />;
      default:
        return <Dashboard />;
    }
  }, [currentStep, goToNextStep]);

  return (
    <Page headerClassName="hidden" footerClassName="hidden">
      <Header step={currentStep} />
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
    </Page>
  );
};

export default Sigil;
