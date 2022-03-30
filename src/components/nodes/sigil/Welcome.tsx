import React from 'react';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const { address, onConnect } = useWalletContext();
  const { login } = useAuthenticationContext();

  return (
    <div
      className={
        "relative h-screen min-h-[791px] bg-[url('/images/nodes/sigil/header-bg.png')] bg-cover bg-center bg-no-repeat"
      }>
      <div className="mx-auto max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">Welcome to the Myriaverse</h1>
        <p className="mt-8 text-[16px] leading-[1.5] text-light">
          Shoreditch hell of viral, blog echo park flexitarian tbh seitan cronut taxidermy
          mumblecore hot chicken.
        </p>
        {address ? (
          <>
            <button
              onClick={onNext}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              JOIN NOW
            </button>
            <button
              className="btn-sm btn-secondary mt-4 min-w-[171px] rounded-lg px-4 py-3"
              onClick={login}>
              Sign in
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onConnect}
              className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
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
