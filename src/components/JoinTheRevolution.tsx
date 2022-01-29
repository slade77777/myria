import Link from 'next/link';
import React from 'react';

type Props = {
  textAnimation?: 'fade-up';
};
const JoinTheRevolution: React.FC<Props> = ({ textAnimation }) => {
  return (
    <div className="bg-[url('/images/join-the-revolution/panel.png')] bg-cover bg-left-top p-[32px] md:py-[107px] md:px-[81px] rounded-[20px] bg-brand-deep-blue relative isolate">
      <p data-aos={textAnimation} className="hidden md:block caption text-brand-light-blue">
        join the revolution
      </p>
      <h2 data-aos={textAnimation} className="md:mt-4 heading-md md:heading-lg">
        We’re hiring, join the future of gaming
      </h2>
      <p data-aos={textAnimation} className="mt-4 md:mt-6 max-w-[616px] body-sm text-light">
        If you want to make a real impact in gaming and blockchain, join us at Myria. We’re scouring
        the world for the best and brightest to join our rapidly growing company.
      </p>
      <Link href={'/careers'}>
        <button data-aos={textAnimation} className="mt-[9px] md:mt-10 btn-lg btn-primary">
          JOIN THE TEAM
        </button>
      </Link>
      <img
        src="/images/join-the-revolution/character.png"
        alt=""
        className="md:absolute top-0 right-0 h-full z-[-1]"
      />
    </div>
  );
};

export default JoinTheRevolution;
