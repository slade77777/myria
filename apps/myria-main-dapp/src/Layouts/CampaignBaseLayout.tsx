import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import Header from 'src/components/sigil/Header';
import { LoadingStandBy } from 'src/components/Loading';
import clsx from 'clsx';
import WelcomeMobile from 'src/components/sigil/WelcomeMobile';
import Sound from 'src/components/sigil/Sound';
import { useAuthenticationContext } from 'src/context/authentication';
import ChooseAllianceStepper from 'src/components/AirDrop/ChooseAlliance/Stepper';

interface Props {
  children: React.ReactNode;
  currentStep: number;
}

const CamPaignBaseLayout: React.FC<Props> = ({ children, currentStep }) => {
  const { userProfileQuery } = useAuthenticationContext();
  const isLoading = !userProfileQuery.isFetched && userProfileQuery.isFetching && currentStep === 0;
  return (
    <>
      <div className={`relative`}>
        {/* <div className={`relative ${currentStep === 1 ? 'min-w-[1300px]' : ''}`}> */}
        {isLoading && (
          <div className="bg-dark/10 absolute inset-0 z-10 flex w-full items-center justify-center text-white">
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
                  isLoading
              })}>
              {!isLoading && <div>{children}</div>}
              {currentStep === 0 && <ChooseAllianceStepper currentStep={currentStep} />}
            </div>
          </div>

          {currentStep === 0 && <Sound />}
        </Page>
      </div>
    </>
  );
};

export default CamPaignBaseLayout;
