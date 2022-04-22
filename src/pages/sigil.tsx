import Link from 'next/link';
import React from 'react';
import Header from 'src/components/nodes/sigil/Header';

const Sigil: React.FC = () => {
  return (
    <>
      <Header />
      <div
        className={
          "relative h-screen bg-[url('/images/nodes/sigil/header-bg.png')] bg-cover bg-bottom bg-no-repeat"
        }>
        <div className="mx-auto max-w-[450px] pt-[213px] text-center">
          <h1 className="text-[28px] font-bold leading-[1.2]">Coming soon</h1>
          <p className="mt-8 text-[16px] leading-[1.5] text-light">
            The Alliance Sigil claim will be launching soon
            <br />
            Which Alliance will you choose? Which Sigil NFT will be yours?
          </p>
          <Link href="/">
            <a className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
              Go back
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sigil;
