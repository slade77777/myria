import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../components/Header';
import { paddingX } from '../utils';
import CareersSection from '../components/Careers';
import Page from '../components/Page';
import { Trans } from '@lingui/macro';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { TAB } from 'src/components/NotiBanner';

const Careers: React.FC = () => {
  const [activatingTab] = useLocalStorage<TAB>('active-tab', 'for-gamer');
  return (
    <Page action={activatingTab === 'for-dev' ? 'start-building' : 'join-discord'}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen mb-[152px]')}>
          <div className="mx-auto max-w-[920px] mt-[60px]">
            <h3 className="text-center heading-sm md:heading-md "><Trans>Careers</Trans></h3>
            <p className="mt-[50px] body md:body-lg text-center">
              <Trans>Join our team of 60+ to forge to future of blockchain gaming</Trans>
            </p>
            <div className="mt-[60px] max-w-[923px] mx-auto">
              <CareersSection />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Careers;
