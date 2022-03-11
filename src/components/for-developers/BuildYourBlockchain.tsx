import clsx from 'clsx';
import React from 'react';
import Input from '../Input';
import Textarea from '../Textarea';

const BuildYourBlockchain: React.FC = () => {
  const inputClassName = 'border-none bg-[#172630] focus:shadow-[0_0_0_1px_#9AC9E3]';

  return (
    <div>
      <div className="mx-auto max-w-[723px] text-center">
        <h2 className="text-[40px] font-bold leading-[1.25]">
          Build your blockchain game with Myria
        </h2>
        <p className="mt-10 text-[20px] leading-[1.5] text-light">
          We would love to hear from you. Contact us and get started with your blockchain gaming
          journey today.
        </p>
      </div>
      <form className="mx-auto mt-[65px] max-w-[616px] space-y-6">
        <Input className={inputClassName} type="text" placeholder="Name" />
        <Input className={inputClassName} type="email" placeholder="Email" />
        <Input className={inputClassName} type="email" placeholder="Company" />
        <Input className={inputClassName} type="email" placeholder="Website" />
        <Textarea className={clsx(inputClassName, 'h-[200px]')} placeholder="Message" />
        <button className="btn-lg btn-primary !mt-8 flex w-full justify-center">SUBMIT</button>
      </form>
    </div>
  );
};

export default BuildYourBlockchain;
