import React from 'react';
import Link from 'next/link';

const WelcomeMobile: React.FC = () => {
  return (
    <div
      className={
        "relative h-screen bg-[url('/images/nodes/sigil/header-bg.jpeg')] bg-cover bg-bottom bg-no-repeat px-4"
      }>
      <div className="mx-auto mb-16 max-w-[408px] pt-[213px] text-center">
        <h1 className="text-[28px] font-bold leading-[1.2]">Welcome to the Myriaverse</h1>
        <p className="mt-8 text-[16px] leading-[1.5] text-light">
          Please view this experience on a desktop browser
        </p>
      </div>
      <Link href="/">
        <a className="btn-lg btn-primary mx-auto mt-10 flex h-[40px] w-[171px] items-center justify-center p-0">
          Go back
        </a>
      </Link>
    </div>
  );
};

export default WelcomeMobile;
