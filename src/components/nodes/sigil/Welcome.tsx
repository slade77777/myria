import React from 'react';
import { headerHeight } from 'src/components/Header';
import { useWalletContext } from 'src/context/wallet';

const Welcome: React.FC = () => {
  const { address } = useWalletContext();

  return (
    <div
      className={
        "relative min-h-[791px] bg-[url('/images/nodes/sigil/header-bg.png')] bg-cover pt-[155px]"
      }>
      <div className="mx-auto max-w-[408px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">Welcome to the Myriaverse</h1>
        <p className="mt-8 text-[16px] leading-[1.5] text-light">
          Shoreditch hell of viral, blog echo park flexitarian tbh seitan cronut taxidermy
          mumblecore hot chicken.
        </p>
        {address ? (
          <button className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
            JOIN NOW
          </button>
        ) : (
          <>
            <button className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              CONNECT WALLET
            </button>
            <p className="mt-4 text-[16px] leading-[1.5] text-brand-gold">Need a wallet?</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
