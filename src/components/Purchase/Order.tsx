/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import ETH from '../icons/ETHIcon';
import NumberInput from './NumberInput';
import * as yup from 'yup';
import { useWalletContext } from 'src/context/wallet';
import { useAuthenticationContext } from 'src/context/authentication';
import Input from '../Input';
import TermsOfServiceModal from './Modals/TermsOfServiceModal';
import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import usePurchaseInfo from '../../hooks/usePurchaseInfo';

const licenses = [
  {
    key: 'term',
    content: <span>I have read, understood and agree to the </span>,
    action: 'terms of conditions'
  },
  {
    key: 'privacy',
    content: <span>I have read, understood and agree to the </span>,
    action: 'privacy policy'
  }
];

interface IOrderProps {
  setQuantityNumberOrder: (arg: number) => void;
  onPlaceOrder: () => void;
}

const schema = yup.object({
  quantity: yup.number().when(['remainNumberOfNodes'], (remainNumberOfNodes) => {
    if (remainNumberOfNodes) {
      return yup.number().positive().min(1).max(remainNumberOfNodes).required();
    }
    return yup.number().positive().min(1).required();
  }),
  term: yup.boolean().required().oneOf([true]),
  privacy: yup.boolean().required().oneOf([true])
});

const Order: React.FC<IOrderProps> = ({ onPlaceOrder, setQuantityNumberOrder }) => {
  const { onConnect, address } = useWalletContext();
  const { login } = useAuthenticationContext();
  const [firstLicense, setFirstLicense] = React.useState(false);
  const [secondLicense, setSecondLicense] = React.useState(false);
  const { data } = usePurchaseInfo();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  useEffect(() => {
    setValue('remainNumberOfNodes', data?.remainNumberOfNodes, { shouldValidate: true });
  }, [data?.remainNumberOfNodes, setValue]);

  const doPurchase = useCallback(
    (data: any) => {
      onPlaceOrder();
    },
    [onPlaceOrder]
  );
  const quantity = useWatch({ control, name: 'quantity' });

  const handleClickLicense = (licenseId: string) => {
    switch (licenseId) {
      case 'term':
        setFirstLicense(true);
        break;
      case 'privacy':
        break;
    }
  };

  return (
    <>
      <TermsOfServiceModal
        open={firstLicense}
        onClose={() => setFirstLicense(false)}
        onAgree={() => alert('Agree')}
      />
      <form onSubmit={handleSubmit(doPurchase)}>
        <div className="rounded-t-lg bg-brand-deep-blue p-6 md:rounded-lg md:p-8">
          <div className="flex items-center justify-between md:block">
            <p className="caption hidden font-bold text-light md:body-sm md:block">
              <Trans>Price</Trans>
            </p>
            <div className="flex items-baseline justify-between md:mt-[7px] md:items-center">
              <div className="flex items-center">
                <ETH /> <p className="heading-md ml-[9px] ">1,5 </p>
              </div>
              <p className="caption ml-2 font-normal text-light md:body-sm md:ml-0">~$1839.04</p>
            </div>

            <div className="ml-[100px] md:ml-0 md:mt-6">
              <p className="body-sm mb-2 hidden text-light md:block">
                <Trans>Quantity</Trans>
              </p>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    setQuantityNumber={(val: number) => {
                      setQuantityNumberOrder(val);
                      field.onChange(val);
                    }}
                  />
                )}
              />
            </div>
            <div className="mt-6 flex flex-row justify-between">
              <p className="body-sm hidden text-light md:block">
                <Trans>Referral Code</Trans>
              </p>
              <p className="body-sm hidden md:block">
                <Trans>Optional</Trans>
              </p>
            </div>
            <Input
              placeholder={t`Enter referral code`}
              {...register('referralCode')}
              className="mt-2 border-none bg-[#0B2231]"
            />
          </div>

          <div className="caption mt-6 font-normal normal-case text-light md:body-sm">
            {licenses.map((license) => (
              <div className="mb-4 flex" key={license.key}>
                <Controller
                  name={license.key}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="checkbox"
                      onChange={(val) => field.onChange(val)}
                      className="mt-1"
                    />
                  )}
                />
                <p className="ml-4">
                  {license.content}{' '}
                  <span
                    className="cursor-pointer text-brand-gold"
                    onClick={() => handleClickLicense(license.key)}>
                    {license.action}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 md:mt-12">
            <button
              className={clsx(
                'btn-lg w-full px-4 uppercase text-black',
                isValid ? 'bg-brand-gold' : 'bg-gray/4'
              )}
              type="submit"
              disabled={!isValid}>
              <Trans>PLACE ORDER</Trans>
            </button>
            <p className="mt-2 text-center">Please tick all boxes to continue</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Order;
