/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
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
import axios from 'axios';
import { PurchaseInformationProps } from './Modals';
import { formatCurrency } from 'src/lib/formatter';
import { useMutation } from 'react-query';
import Button from 'src/components/core/Button';
import { toast } from 'react-toastify';
import { useGA4 } from '../../lib/ga';
import WhiteListSale, { WarningNodeType } from './Modals/WhiteListSale';
import PrivacyPolicyModal from './Modals/PrivacyPolicyModal';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';

const licenses = [
  {
    key: 'term',
    content: <span>I have read, understood and agree to sign the </span>,
    action: 'future node purchase agreement'
  },
  {
    key: 'privacy',
    content: <span>I have read, understood and agree to the </span>,
    action: 'privacy policy'
  }
];

interface IOrderProps {
  onPlaceOrder: (data: PurchaseInformationProps) => void;
  warningType?: WarningNodeType;
}

const schema = yup.object({
  quantity: yup.number().positive().min(1).required(),
  term: yup.boolean().required().oneOf([true]),
  privacy: yup.boolean().required().oneOf([true])
});

const ToAddress = process.env.NEXT_PUBLIC_NODE_RECIEVER_ADDRESS as string;

const Order: React.FC<IOrderProps> = ({ onPlaceOrder, warningType }) => {
  const { onConnect, address } = useWalletContext();
  const { login } = useAuthenticationContext();
  const [firstLicense, setFirstLicense] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [whitelistError, setWhitelistError] = useState(false);
  const { event } = useGA4();
  const { data } = usePurchaseInfo();
  const { data: etheCost = 0 } = useEtheriumPrice();

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

  const price = data?.price || 0.01;
  const quantity = useWatch({ control, name: 'quantity' }) || 0;

  const { mutateAsync: submitPurchase, isLoading: isSubmiting } = useMutation(
    async ({ numberOfNode }: { numberOfNode: number }) => {
      await new Promise((resolve, reject) => {
        if (numberOfNode <= 2) {
          console.log('Submited', { numberOfNode });
          resolve(numberOfNode);
        } else {
          reject('The maximum node available is 2');
        }
      });
      return {
        transactionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        totalPrice: price * quantity,
        toAddress: ToAddress
      };
    }
  );

  const doPurchase = useCallback(
    (data: any) => {
      const { quantity } = data;
      submitPurchase({ numberOfNode: quantity })
        .then((response) => {
          onPlaceOrder({
            quantity,
            totalPriceEth: response.totalPrice,
            totalPriceUsd: price * quantity * etheCost,
            toAddress: response.toAddress,
            nonce: response.transactionId,
            transactionId: response.transactionId
          });
          event('Node Order Placed', {
            campaign: 'Nodes',
            wallet_address: address,
            node_quantity: quantity,
            order_status: 'Completed'
          });
        })
        .catch((e) => {
          toast.clearWaitingQueue({ containerId: 'node purchase limit' });
          toast.error(e, {
            toastId: 'node purchase limit'
          });
        });
    },
    [submitPurchase, address, onPlaceOrder, price, etheCost, event]
  );

  const handleClickLicense = (licenseId: string) => {
    switch (licenseId) {
      case 'term':
        setFirstLicense(true);
        break;
      case 'privacy':
        setShowPrivacy(true);
        break;
    }
  };

  return (
    <>
      <TermsOfServiceModal
        open={firstLicense}
        onClose={() => setFirstLicense(false)}
        onAgree={() => setFirstLicense(false)}
      />
      <PrivacyPolicyModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        onAgree={() => setShowPrivacy(false)}
      />
      <div>
        <div className="bg-brand-deep-blue rounded-t-lg p-6 md:rounded-lg md:p-8">
          <div className="flex items-center justify-between md:block">
            <p className="text-light md:body-sm hidden font-bold md:block">
              <Trans>Price</Trans>
            </p>
            <div className="flex items-baseline justify-between md:mt-[7px] md:items-center">
              <div className="flex items-center">
                <ETH /> <p className="heading-md ml-[9px] ">{price * quantity}</p>
              </div>
              <p className="caption text-light md:body-sm ml-2 font-normal md:ml-0">
                ~${formatCurrency(price * quantity * etheCost, 2)}
              </p>
            </div>

            <div className="ml-[100px] md:ml-0 md:mt-6">
              <p className="body-sm text-light hidden md:block">
                <Trans>Quantity</Trans>
              </p>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    setQuantityNumber={(val: number) => {
                      field.onChange(val);
                      event('Node Order Updated', {
                        campaign: 'Nodes',
                        wallet_address: address,
                        node_quantity: val
                      });
                    }}
                  />
                )}
              />
            </div>
            {/*<div className="mt-6 flex flex-row justify-between">*/}
            {/*  <p className="body-sm hidden text-light md:block">*/}
            {/*    <Trans>Referral Code</Trans>*/}
            {/*  </p>*/}
            {/*  <p className="body-sm hidden md:block">*/}
            {/*    <Trans>Optional</Trans>*/}
            {/*  </p>*/}
            {/*</div>*/}
            {/*<Input*/}
            {/*  placeholder={t`Enter referral code`}*/}
            {/*  {...register('referralCode')}*/}
            {/*  className="mt-2 border-none bg-[#0B2231]"*/}
            {/*/>*/}
          </div>

          <div className="caption text-light md:body-sm mt-6 font-normal normal-case">
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
                    className="text-brand-gold cursor-pointer"
                    onClick={() => handleClickLicense(license.key)}>
                    {license.action}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 md:mt-12">
            <Button
              className={clsx(
                'btn-lg w-full px-4 uppercase text-black',
                isValid && !warningType ? 'bg-brand-gold' : 'bg-gray-400'
              )}
              onClick={handleSubmit(doPurchase)}
              loading={isSubmiting}
              disabled={!isValid || !!warningType}>
              <Trans>PLACE ORDER</Trans>
            </Button>
            <p className="mt-2">
              Be aware that Whitelisted Users can purchase up to two Nodes only (at Whitelist
              price). Any attempt to obtain more will result in funds losses.
            </p>
          </div>
        </div>
      </div>
      {/*<WhiteListSale open={whitelistError} onClose={() => setWhitelistError(false)} />*/}
    </>
  );
};

export default Order;
