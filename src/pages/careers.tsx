import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import { useTabContext } from 'src/context/tabContext';
import CareersSection from '../components/Careers';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';

const Careers: React.FC = () => {
  const { activatingTab } = useTabContext();
  return (
    <Page action={'auto'}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[152px] md:min-h-screen')}>
          <div className="mx-auto mt-[60px] max-w-[920px]">
            <h3 className="heading-sm text-center md:heading-md ">
              <Trans>Careers</Trans>
            </h3>
            <p className="body mt-[50px] text-center md:body-lg">
              <Trans>Join our team of 60+ to forge to future of blockchain gaming</Trans>
            </p>
            <div className="mx-auto mt-[60px] max-w-[923px]">
              <CareersSection />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Careers;
