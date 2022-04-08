import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import { useTabContext } from 'src/context/tabContext';
import CareersSection from '../../components/Careers';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { paddingX } from '../../utils';

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
          <div className="mx-auto mt-[60px]">
            <h1 className="heading-sm text-center md:heading-massive md:text-left ml-6">
              <Trans>Current Openings</Trans>
            </h1>
            <div className="mx-auto mt-[60px] px-10">
              <CareersSection />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Careers;
