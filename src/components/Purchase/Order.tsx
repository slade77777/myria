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
    value: 1,
    content: (
      <span>
        I have read, understood and agree to the{' '}
        <span className="text-brand-gold">privacy policy</span>
      </span>
    )
  },
  {
    value: 2,
    content: (
      <span>
        I have read, understand and agree that Myria Founder’s nodes are{' '}
        <span className="text-brand-gold">not investments</span>
      </span>
    )
  }
];

interface IOrderProps {
  setQuantityNumberOrder: (arg: number) => void;
  onPlaceOrder: () => void;
}

const Order: React.FC<IOrderProps> = ({ onPlaceOrder, setQuantityNumberOrder }) => {
  const { onConnect, address } = useWalletContext();
  const { login } = useAuthenticationContext();
  const [quantity, setQuantity] = React.useState(0);
  const [firstLicense, setFirstLicense] = React.useState(false);
  const [secondLicense, setSecondLicense] = React.useState(false);
  const [thirdLicense, setThirdLicense] = React.useState(false);
  const [license, setLicense] = React.useState([false, false, false]);

  const setQuantityNumber = (childdata: number): void => {
    setQuantity(childdata);
    setQuantityNumberOrder(childdata);
  };
  function changeLicense(key: number) {
    let temp_license = license;
    temp_license[key] = temp_license[key] == false ? true : false;
    setLicense(temp_license);
    // console.log(temp_license);
  }
  
  function doPurchase(){
    if(license[0]==true&&license[1]==true&&license[2]==true){
      onPlaceOrder();
    }
  }
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
          <p className="caption ml-2 font-normal text-light md:body-sm md:ml-0">~$1839.04</p>
        </div>

        <div className="ml-[100px] md:ml-0 md:mt-6">
          <p className="body-sm mb-2 hidden md:block">
            <Trans>Quantity</Trans>
          </p>
          <NumberInput setQuantityNumber={setQuantityNumber} />
        </div>
      </div>

      <div className="caption mt-6 font-normal normal-case text-light md:body-sm md:mt-10">
        {licenses.map((license) => (
          <div className="mb-4 flex" key={license.value}>
            <Input
              type="checkbox"
              onClick={() => {
                changeLicense(license.value);
              }}
              className="mt-1"
            />
            <p className="ml-4">{license.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 md:mt-12">
        <button
          className="btn-lg w-full bg-brand-gold px-4 uppercase text-black"
          onClick={()=>{doPurchase()}}>
          <Trans>PURCHASE NOW</Trans>
        </button>
      </div>
    </div>
  );
};

export default Order;
