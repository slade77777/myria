import React from 'react';

const JoinTheRevolution: React.FC = () => {
  return (
    <div className="bg-[url('/images/join-the-revolution/panel.png')] bg-cover bg-left-top p-[32px] md:py-[107px] md:px-[81px] rounded-[20px] bg-brand-deep-blue relative isolate">
      <img
        src="/images/join-the-revolution/character.png"
        alt=""
        className="absolute top-0 right-0 h-full z-[-1]"
      />
      <p className="hidden md:block caption text-brand-light-blue">join the revolution</p>
      <h2 className="md:mt-4 heading-md md:heading-lg">We’re hiring, join the future of gaming</h2>
      <p className="mt-4 md:mt-6 max-w-[616px] body text-light">
        If you want to make a real impact in gaming and blockchain, join us at Myria. We’re scouring
        the world for the best and brightest to join our rapidly growing company.
      </p>
      <button className="mt-[9px] md:mt-10 btn-lg btn-primary">JOIN THE TEAM</button>
    </div>
  );
};

export default JoinTheRevolution;
