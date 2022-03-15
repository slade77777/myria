import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import Input from '../Input';
import Textarea from '../Textarea';

const BuildYourBlockchain: React.FC = () => {
  const inputClassName = 'border-none bg-[#172630] focus:shadow-[0_0_0_1px_#9AC9E3]';

  return (
    <div>
      <div className="mx-auto max-w-[723px] text-center">
        <h2 className="text-[32px] font-bold leading-[1.25] md:text-[40px]">
          <Trans>Build your blockchain game with Myria</Trans>
        </h2>
        <p className="mt-6 text-[18px] leading-[1.5] text-light md:mt-10 md:text-[20px]">
          <Trans>We would love to hear from you. Contact us and get started with your blockchain gaming
          journey today.</Trans>
        </p>
      </div>
      <form className="mx-auto mt-8 max-w-[616px] space-y-6 md:mt-[65px]">
        <Input className={inputClassName} type="text" placeholder="Name" />
        <Input className={inputClassName} type="email" placeholder="Email" />
        <Input className={inputClassName} type="email" placeholder="Company" />
        <Input className={inputClassName} type="email" placeholder="Website" />
        <Textarea className={clsx(inputClassName, 'h-[200px]')} placeholder="Message" />
        <button className="btn-lg btn-primary !mt-8 flex w-full justify-center"><Trans>SUBMIT</Trans></button>
      </form>
    </div>
  );
};

export default BuildYourBlockchain;
