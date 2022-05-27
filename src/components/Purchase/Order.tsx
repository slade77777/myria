/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import clsx from 'clsx';
import ETH from '../icons/ETHIcon';
import NumberInput from './NumberInput';
import styles from './styles.module.css';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import Input from '../Input';
import { Trans } from '@lingui/macro';

const licenses = [
  {
    value: 0,
    content: (
      <span>
        I have read, understood and agree to the{' '}
        <span className="text-brand-gold">terms of service </span>
      </span>
    )
  },
  {
    value: 2,
    content: (
      <span>
        I have read, understood and agree to the{' '}
        <span className="text-brand-gold">privacy policy</span>
      </span>
    )
  },
  {
    value: 3,
    content: (
      <span>
        I have read, understand and agree that Myria Founder’s nodes are{' '}
        <span className="text-brand-gold">not investments</span>
      </span>
    )
  }
];

const Order: React.FC<{ onPlaceOrder: () => void }> = ({ onPlaceOrder }) => {
  const { onConnect, address } = useWalletContext();
  const { login } = useAuthenticationContext();

  return (
    <div className="rounded-t-lg bg-brand-deep-blue p-6 md:rounded-lg md:p-8">
      <div className="flex items-center justify-between md:block">
        <p className="caption hidden font-bold text-light md:body-sm md:block">
          <Trans>Price</Trans>
        </p>
        <div className="flex items-baseline justify-between md:mt-[7px] md:items-center">
          <div className="flex items-center">
            <ETH /> <p className="heading-md ml-[9px] ">1.5 </p>
          </div>
          <p className="caption ml-2 font-normal text-light md:body-sm md:ml-0">~$4,608.22</p>
        </div>

        <div className="ml-[100px] md:ml-0 md:mt-6">
          <p className="body-sm mb-2 hidden md:block">
            <Trans>Quantity</Trans>
          </p>
          <NumberInput />
        </div>
      </div>

      <div className="caption mt-6 font-normal normal-case text-light md:body-sm md:mt-10">
        {licenses.map((license) => (
          <div className="mb-4 flex" key={license.value}>
            <Input type="checkbox" className="mt-1" />
            <p className="ml-4">{license.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 md:mt-12">
        <button
          className="btn-lg w-full bg-brand-gold px-4 uppercase text-black"
          onClick={onPlaceOrder}>
          <Trans>PURCHASE NOW</Trans>
        </button>
      </div>
    </div>
  );
};

export default Order;
