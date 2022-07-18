import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  textAnimation?: 'fade-up';
};
const JoinTheRevolution: React.FC<Props> = ({ textAnimation }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex md:hidden">
        <Image
          src="/images/join-the-revolution/half-character_op.png"
          alt=""
          width={249}
          height={258}
        />
      </div>
      <div className="relative isolate w-full rounded-[22px] bg-brand-deep-blue bg-[url('/images/join-the-revolution/panel_op.jpeg')] bg-cover bg-left-top p-[32px] md:py-[107px] md:px-[81px]">
        <p data-aos={textAnimation} className="caption hidden text-brand-light-blue md:block">
          <Trans>join the revolution</Trans>
        </p>
        <h2 data-aos={textAnimation} className="heading-list leading-[30px] md:heading-lg md:mt-4">
          <Trans>We’re hiring, join the future of gaming</Trans>
        </h2>
        <p
          data-aos={textAnimation}
          className="text-base leading-6 mt-4 max-w-[616px] text-light md:mt-6">
          <Trans>
            If you want to make a real impact in gaming and blockchain, join us at Myria. We’re
            scouring the world for the best and brightest to join our rapidly growing company.
          </Trans>
        </p>
        <Link href={'/careers'}>
          <a data-aos={textAnimation} className="btn-lg btn-primary mt-6 md:mt-10">
            <Trans>JOIN THE TEAM</Trans>
          </a>
        </Link>
        <img
          src="/images/join-the-revolution/character_op.png"
          alt=""
          className="top-0 right-0 z-[-1] hidden md:absolute md:block md:h-full"
        />
      </div>
    </div>
  );
};

export default JoinTheRevolution;
