import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from 'src/components/icons/Logo';
import Socials from 'src/components/Social';
import GetInTouch from '../components/GetInTouch';
import { headerHeight } from '../components/Header';
import MailIcon from '../components/icons/MailIcon';
import Page from '../components/Page';
import { paddingX } from '../utils';

const SignupComplete: React.FC = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center bg-black bg-[url("/images/signup-complete/bg.png")] bg-cover bg-center text-white'>
      <div className="flex items-center py-10">
        <Link href="/">
          <a className="w-[164px]">
            <Logo />
          </a>
        </Link>
      </div>
      <div className="py-10 max-w-[500px] text-center">
        <p className="text-[32px] font-normal mb-10">
          <Trans>Registration Successful</Trans>
        </p>
        <Image
          src="/images/signup-complete/success.png"
          layout="fixed"
          width={256}
          height={256}
          alt=""
          className="mb-10"
        />
        <p className="mb-10 mt-10">
          <Trans>
            Congratulations, you have become a myrian.
            <br /> Click the button below to login and compelete account set up
          </Trans>
        </p>
        <Link href="/nodes/dashboard/nodes">
          <a className="btn-lg btn-primary">
            <Trans>GO TO DASHBOARD</Trans>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SignupComplete;
