import React, { useCallback, useMemo, useState } from 'react';
import CamPaignBaseLayout from 'src/Layouts/CampaignBaseLayout';
import AirDropContent from 'src/components/AirDrop/AirDropContent';
import ChooseAlliance from 'src/components/AirDrop/ChooseAlliance';
import Welcome from 'src/components/AirDrop/Welcome';
import FirstLoadingCampaign from 'src/components/AirDrop/FirstLoading/FirstLoadingCampaign';

export type Step = 0 | 1 | 2 | 3;

const AirDropCampaign: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(0);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      if (prevStep === 3) {
        return prevStep;
      }
      return (prevStep + 1) as Step;
    });
  }, []);

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <FirstLoadingCampaign />;
      case 1:
        return <Welcome onNext={goToNextStep} setCurrentStep={setCurrentStep} isAirDrop={true} />;
      case 2:
        return <ChooseAlliance currentStep={currentStep} onNext={goToNextStep} />;
      default:
        return <AirDropContent />;
    }
  }, [currentStep, goToNextStep]);

  return (
    <CamPaignBaseLayout currentStep={currentStep} setCurrentStep={setCurrentStep}>
      {content}
    </CamPaignBaseLayout>
  );
};

export default AirDropCampaign;
