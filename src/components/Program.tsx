import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';
import BuyANodeLink from './BuyANode';

const Program: React.FC = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative isolate rounded-xl bg-[url('/images/program/panel-1.jpeg')] bg-cover bg-center p-8 pb-[32px] md:pb-[86px]">
        <p className="max-w-[468px] text-[24px] font-bold leading-[1.25] md:text-[28px]">
          <Trans> Become a Myria node owner & receive rewards</Trans>
        </p>
        <p className="mt-4 max-w-[417px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
          <Trans>
            Receive $MYRIA and limited edition NFT rewards whilst supporting the Myria network
          </Trans>
        </p>
        <div className="mt-[13px] flex items-center justify-between md:mt-[11px]">
          <BuyANodeLink className="btn-lg btn-primary min-w-[145px] md:mt-10 " />
          <img
            src="/images/program/computer_op.png"
            alt=""
            width="268"
            height="145"
            className="right-4 bottom-4 z-[-1] w-[158px] md:absolute md:w-[268px]"
          />
        </div>
      </div>
      <div className="relative isolate rounded-xl bg-[url('/images/program/panel-2.jpeg')] bg-cover bg-center p-8 pb-[70px] md:pb-[86px]">
        <p className="max-w-[468px] text-[24px] font-bold leading-[1.25] md:text-[28px]">
          <Trans> Gaming is evolving. Build with Myria! </Trans>
        </p>
        <p className="mt-4 max-w-[467px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
          <Trans>
            Myria helps blockchain projects scale. Whether you’re an established crypto business or
            simply exploring new possibilities, Myria has a solution for you!
          </Trans>
        </p>
        <Link href="/for-developers#dev-contact">
          <a className="btn-lg btn-primary mt-8 md:mt-10 md:min-w-[145px]">
            <Trans>Start now</Trans>
          </a>
        </Link>
        <img
          src="/images/program/coins.png"
          alt=""
          width="200"
          height="363"
          className="absolute right-4 top-0 z-[-1]"
        />
      </div>
    </div>
  );
};

export default Program;
