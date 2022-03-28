import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { paddingX } from 'src/utils';
import Dashboard from 'src/components/nodes/sigil/Dashboard';
import SigilStepper from 'src/components/nodes/sigil/SigilStepper';
import ChooseAlliance from 'src/components/nodes/sigil/ChooseAlliance';
import Welcome from 'src/components/nodes/sigil/Welcome';

const Sigil: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <Welcome />;
      case 1:
        return <ChooseAlliance />;
      default:
        return <Dashboard />;
    }
  }, [currentStep]);

  return (
    <Page footerClassName="hidden">
      <div className="relative min-h-screen">
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
        <div>{content}</div>
      </div>
    </Page>
  );
};

export default Sigil;
