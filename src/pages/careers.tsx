import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../components/Header';
import { paddingX } from '../utils';
import CareersSection from '../components/Careers';
import Page from '../components/Page';

const Careers: React.FC = () => {
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen mb-[152px]')}>
          <div className="mx-auto max-w-[900px] mt-[60px]">
            <h3 className="text-center heading-sm md:heading-md ">Careers</h3>
            <p className="mt-[50px] body md:body-lg text-center">
              Join our team of 60+ to forge to future of blockchain gaming
            </p>
            <div className="mt-[60px] max-w-content mx-auto">
              <CareersSection />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Careers;
