/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import ETH from '../icons/ETHIcon';
import NumberInput from './NumberInput';
import * as yup from 'yup';
import { useWalletContext } from 'src/context/wallet';
import Input from '../Input';
import TermsOfServiceModal from './Modals/TermsOfServiceModal';
import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { formatCurrency } from 'src/lib/formatter';
import Button from 'src/components/core/Button';
import { useGA4 } from '../../lib/ga';
import { WarningNodeType } from './Modals/WhiteListSale';
import PrivacyPolicyModal from './Modals/PrivacyPolicyModal';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import useNodePurchase from '../../hooks/useNodePurchase';
import { toast } from 'react-toastify';

const licenses = [
  {
    key: 'term',
    content: <span>I have read, understood and agree to sign the </span>,
    action: 'Terms & conditions'
  },
  {
    key: 'privacy',
    content: <span>I have read, understood and agree to the </span>,
    action: 'Privacy policy'
  }
];

interface IOrderProps {
  onPlaceOrder: (data: any) => void;
  warningType?: WarningNodeType;
}

const schema = yup.object({
  quantity: yup.number().positive().min(1).required(),
  term: yup.boolean().required().oneOf([true]),
  privacy: yup.boolean().required().oneOf([true])
});

const Order: React.FC<IOrderProps> = ({ onPlaceOrder, warningType }) => {
  const { address } = useWalletContext();
  const [firstLicense, setFirstLicense] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { event } = useGA4();
  const { data: etheCost = 0 } = useEtheriumPrice();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const { data: nodeData } = useNodePurchase();

  const price = nodeData?.nodePriceInETH ? +nodeData.nodePriceInETH : 0;
  const quantity = useWatch({ control, name: 'quantity' }) || 0;

  const doPurchase = useCallback(
    (data: any) => {
      const { quantity } = data;
      if (nodeData?.destinationAddress) {
        onPlaceOrder({
          quantity,
          totalPriceEth: price * quantity,
          totalPriceUsd: price * quantity * etheCost,
          toAddress: nodeData.destinationAddress
        });
        event('Node Order Placed', {
          campaign: 'Nodes',
          wallet_address: address,
          node_quantity: quantity,
          order_status: 'Completed'
        });
      } else {
        toast.error('cannot process purchase, Please try later!');
      }
    },
    [onPlaceOrder, price, etheCost, nodeData?.destinationAddress, event, address]
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

  const onAgreeAgreement = () => {
    setFirstLicense(false);
    const values = getValues();
    reset({ ...values, term: true });
  };

  const onAgreePolicy = () => {
    setShowPrivacy(false);
    const values = getValues();
    reset({ ...values, privacy: true });
  };

  return (
    <>
      <TermsOfServiceModal
        open={firstLicense}
        onClose={() => setFirstLicense(false)}
        onAgree={onAgreeAgreement}
      />
      <PrivacyPolicyModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        onAgree={onAgreePolicy}
      />
      <div>
        <div className="bg-base/3 rounded-t-lg p-6 md:rounded-lg md:p-8">
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
                    max={nodeData?.canPurchaseCount || 2}
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
                      checked={field.value === true}
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
              loading={false}
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
