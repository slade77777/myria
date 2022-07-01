import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import CareersSection from '../components/Careers';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';

const Jobs: React.FC = () => {
  return (
    <Page action={'auto'}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[152px] md:min-h-screen')}>
          <div className="mx-auto mt-[80px]">
            <h1 className="heading-md ml-6 text-left md:heading-massive">
              <Trans>Current Openings</Trans>
            </h1>
            <div className="mx-auto mt-12 px-10 md:mt-[72px]">
              <CareersSection />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Jobs;
