import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase from 'src/components/Purchase/Modals';
import Subscribe from 'src/components/Subscribe';
import Stepper, { Step } from 'src/components/Stepper';
import { t } from '@lingui/macro';

const trophy = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M38 10H34V8C34 6.9 33.1 6 32 6H16C14.9 6 14 6.9 14 8V10H10C7.8 10 6 11.8 6 14V16C6 21.1 9.84 25.26 14.78 25.88C16.04 28.88 18.74 31.14 22 31.8V38H16C14.9 38 14 38.9 14 40C14 41.1 14.9 42 16 42H32C33.1 42 34 41.1 34 40C34 38.9 33.1 38 32 38H26V31.8C29.26 31.14 31.96 28.88 33.22 25.88C38.16 25.26 42 21.1 42 16V14C42 11.8 40.2 10 38 10ZM10 16V14H14V21.64C11.68 20.8 10 18.6 10 16ZM38 16C38 18.6 36.32 20.8 34 21.64V14H38V16Z"
      fill="#9AC9E3"
    />
  </svg>
);

const dashboard = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 20H14C15.1 20 16 19.1 16 18V2C16 0.9 15.1 0 14 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20ZM2 36H14C15.1 36 16 35.1 16 34V26C16 24.9 15.1 24 14 24H2C0.9 24 0 24.9 0 26V34C0 35.1 0.9 36 2 36ZM22 36H34C35.1 36 36 35.1 36 34V18C36 16.9 35.1 16 34 16H22C20.9 16 20 16.9 20 18V34C20 35.1 20.9 36 22 36ZM20 2V10C20 11.1 20.9 12 22 12H34C35.1 12 36 11.1 36 10V2C36 0.9 35.1 0 34 0H22C20.9 0 20 0.9 20 2Z"
      fill="#F5B941"
    />
  </svg>
);

const PurchaseComplete: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = useMemo(
    () => [
      {
        title: t`Step 1`,
        description: t`Node purchase`
      },
      {
        title: t`Step 2`,
        description: t`Create an account`
      },
      {
        title: t`Step 3`,
        description: t`Access node dashboard`
      },
      {
        title: t`Step 4`,
        description: t`Claim rewards`
      }
    ],
    []
  );

  return (
    <Page>
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(
          "mb-[120px] bg-[url('/images/nodes/purchase-page-bg.png')] bg-top bg-no-repeat"
        )}>
        <div className="mx-auto w-full px-6 text-center md:max-w-[832px]">
          <div className="mt-[77px]">
            <Stepper steps={steps} currentStep={currentStep} contentClassName="max-w-[149px]" />
          </div>
          <h1 className="heading-md mt-[64px] text-center font-extrabold text-brand-mid-blue md:heading-massive">
            Congratulations!
            <br />
            <span className="text-brand-white">Your purchase is complete.</span>
          </h1>

          <div className="heading-sm mt-8 mb-12 text-center">Get started with your Myria node.</div>
          <button className="btn-lg btn-primary">Create an account</button>
          <div className="mt-[148px] grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10">
            <div className="relative rounded-xl bg-brand-deep-blue px-[43px]">
              <div className="absolute -top-12 left-0 right-0 m-auto flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#0E2A3C]">
                {dashboard}
              </div>
              <h1 className="heading-sm mt-[84px]">Your Myria Dashboard</h1>
              <p className="body-sm mt-6 text-center text-light">
                Configure your node and view your rewards in the dashboard
              </p>
              <a href="#" className="btn-lg btn-primary mt-10 mb-8">
                Go to my dashboard
              </a>
            </div>

            <div className="relative rounded-xl bg-brand-deep-blue px-[43px]">
              <div className="absolute -top-12 left-0 right-0 m-auto flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#0E2A3C]">
                {trophy}
              </div>
              <h1 className="heading-sm mt-[84px]">Purchase more nodes</h1>
              <p className="body-sm mt-6 text-center text-light">
                Purchase more nodes to increase your rewards and passive invome
              </p>
              <a href="#" className="btn-lg btn-primary mt-10 mb-8">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PurchaseComplete;
