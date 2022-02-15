/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import clsx from 'clsx';
import ETH from '../icons/ETHIcon';
import NumberInput from './NumberInput';
import styles from './styles.module.css';
import { useWalletContext } from 'src/providers/useWallet';

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

  const onClickPurchase = () => {
    if (address) {
      onPlaceOrder();
    } else {
      onConnect();
    }
  };

  return (
    <div className="rounded-lg bg-brand-deep-blue p-8">
      <p className="body-sm text-light">Price</p>
      <div className="mt-[7px] flex items-center justify-between">
        <div className="flex items-center">
          <ETH /> <p className="heading-md ml-[9px] ">1.5 </p>
        </div>
        <p className="body-sm text-light">~$4,608.22</p>
      </div>

      <div className="mt-6">
        <p className="body-sm mb-2">Quantity</p>
        <NumberInput />
      </div>

      <div className="body-sm mt-10 text-light">
        {licenses.map((license) => (
          <div className="mb-4 flex" key={license.value}>
            <input
              type="checkbox"
              className={clsx(
                'bg-red mt-1 h-5 w-5 flex-none cursor-pointer appearance-none rounded-sm border border-brand-light-blue checked:bg-brand-light-blue',
                styles['checkbox-terms']
              )}
            />
            <p className="ml-4">{license.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          className="btn-lg w-full bg-brand-gold px-4 uppercase text-black"
          onClick={onClickPurchase}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
