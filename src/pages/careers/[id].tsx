import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { ga, useGA4 } from 'src/lib/ga';
import { headerHeight } from '../../components/Header';
import DiscordIcon from '../../components/icons/DiscordIcon';
import Page from '../../components/Page';
import { paddingX } from '../../utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FirstSlider from '../../components/game-detail/FirstSlider';
import SecondSlider from '../../components/game-detail/SecondSlider';
import { useRouter } from 'next/router';
import Subscribe from 'src/components/Subscribe';
import { Trans } from '@lingui/macro';
import Details from 'src/components/Careers/Details';


const JobDetail: React.FC = () => {



  return (
    <Page action={'auto'}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[152px] md:min-h-screen mx-auto mt-[50px] max-w-[832px]')}>
          <Details />
        </section>
      </div>
    </Page>
  );
};

export default JobDetail;
