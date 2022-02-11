import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';

type Props = {
  textAnimation?: 'fade-up';
};
const JoinTheRevolution: React.FC<Props> = ({ textAnimation }) => {
  return (
    <div className="relative isolate rounded-[20px] bg-brand-deep-blue bg-[url('/images/join-the-revolution/panel.png')] bg-cover bg-left-top p-[32px] md:py-[107px] md:px-[81px]">
      <p data-aos={textAnimation} className="caption hidden text-brand-light-blue md:block">
        <Trans>join the revolution</Trans>
      </p>
      <h2 data-aos={textAnimation} className="heading-md md:heading-lg md:mt-4">
        <Trans>We’re hiring, join the future of gaming</Trans>
      </h2>
      <p data-aos={textAnimation} className="body-sm mt-4 max-w-[616px] text-light md:mt-6">
        <Trans>
          If you want to make a real impact in gaming and blockchain, join us at Myria. We’re
          scouring the world for the best and brightest to join our rapidly growing company.
        </Trans>
      </p>
      <Link href={'/careers'}>
        <a data-aos={textAnimation} className="btn-lg btn-primary mt-[9px] md:mt-10">
          <Trans>JOIN THE TEAM</Trans>
        </a>
      </Link>
      <img
        src="/images/join-the-revolution/character.png"
        alt=""
        className="top-0 right-0 z-[-1] md:absolute md:h-full"
      />
    </div>
  );
};

export default JoinTheRevolution;
