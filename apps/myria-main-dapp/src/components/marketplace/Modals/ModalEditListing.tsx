import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import { AssetDetailsResponse } from 'myria-core-sdk';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/core/Button';
import DAOIcon from 'src/components/icons/DAOIcon';
import ETHWhite from 'src/components/icons/ETHWhite';
import InfoCircle from 'src/components/icons/InfoCircle';
import ProgressIcon from 'src/components/icons/ProgressIcon';
import Input from 'src/components/Input';
import Modal from 'src/components/Modal';
import Tooltip from 'src/components/Tooltip';
import { formatNumber2digits } from 'src/utils';
import * as yup from 'yup';
import { AssetStatus } from '../AssetDetails';

interface Props {
  // title: string;
  open: boolean;
  onClose?: () => void;
  ethereum?: number;
  description?: string;
  items?: AssetDetailsResponse;
  imgSrc?: string;
  onSubmit: (data: IFormInputs) => void;
  status: AssetStatus;
  rarityColor: string;
}

interface IFormInputs {
  price: string;
}

const MINIMUM_PRICE = 0.000001;

export const ModalEditListing: React.FC<Props> = ({
  description,
  imgSrc,
  ethereum = 1000,
  open,
  onClose,
  items,
  status,
  onSubmit,
  rarityColor
}) => {
  const [isConfirmButton, setIsConfirmButton] = useState<boolean>(false);
  const INPUT_MAX_LIMIT = 10000000000;
  const schema = yup
    .object({
      price: yup
        .number()
        .min(MINIMUM_PRICE, `Minimum is ${MINIMUM_PRICE} price`)
        .required(t`Price is required!`)
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const ethPrice = watch('price');
  const canConfirm = !isNaN(parseFloat(ethPrice)) && parseFloat(ethPrice) >= MINIMUM_PRICE;
  const BUTTON_BG = useMemo(() => {
    return !isSubmitSuccessful && canConfirm ? 'btn-primary' : 'btn-disabled';
  }, [isSubmitSuccessful, canConfirm]);

  const defaultModal =
    status === AssetStatus.MODIFY
      ? {
          title: 'Modify Listing',
          titleConfirm: <Trans>CONFIRM CHANGE</Trans>,
          labelInput: <Trans>Listing Price</Trans>
        }
      : {
          title: 'List your item for sale',
          titleConfirm: <Trans>CONFIRM YOUR YOUR LISTING</Trans>,
          labelInput: <Trans>Listing Price</Trans>
        };

  const onHandleSubmit = (value: IFormInputs) => {
    setIsConfirmButton(true);
    onSubmit({
      price: `${{ price: `${{ price: `${{ price: `${value.price}` }.price}` }.price}` }.price}`
    });
  };

  const onHandleError = (errors: any) => {
    setIsConfirmButton(false);
  };
  const proceedsFrSale = useMemo(() => {
    if (!items?.fee.length) {
      return +ethPrice;
    }
    return items && ethPrice ? (+ethPrice * (100 - items?.fee[0]?.percentage)) / 100 : 0;
  }, [ethPrice, items]);
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={defaultModal.title} className="shadow-[0_0_40px_10px_#0000004D] ">
        <form className="p-6 pt-8">
          <div className="flex items-center gap-6 p-4 rounded-lg bg-base/4">
            <div className="relative w-32">
              <img className="z-10 rounded-[6px]" src={imgSrc} />
              <div
                className="z-1 absolute top-0 h-full w-full rounded-xl opacity-[0.3]"
                style={{ backgroundColor: rarityColor }}
              />
            </div>
            <div>
              <p className="text-sm text-light">
                <Trans>{items?.collectionName}</Trans>
              </p>
              <p className="my-2 text-[18px] font-bold">
                <Trans>{items?.name}</Trans>
              </p>
              <p className="text-sm text-light">
                <Trans>Token ID:</Trans> {items?.tokenId}
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-light">
            <Trans>
              Collection median price: <span className="text-white">2.00 ETH</span>
            </Trans>
          </p>
          <div className="relative mt-8">
            <span className="text-light">{defaultModal.labelInput}</span>
            <div className="absolute top-10 left-2">
              <DAOIcon />
            </div>
            <Input
              max={10}
              type="number"
              {...register('price')}
              onChange={(e: any) => {
                if (parseFloat(e.target.value) < INPUT_MAX_LIMIT) setValue('price', e.target.value);
                if (parseFloat(e.target.value) >= INPUT_MAX_LIMIT) {
                  setValue('price', `${INPUT_MAX_LIMIT}`);
                }
                if (parseFloat(e.target.value) < MINIMUM_PRICE) {
                  setError('price', { message: `Minimum is ${MINIMUM_PRICE} price` });
                } else {
                  clearErrors('price');
                }
              }}
              placeholder={'0.00'}
              autoComplete="off"
              error={!!errors.price}
              errorText={errors.price?.message}
              className="bg-base/4 mt-1 rounded-lg border-none pr-[100px] pl-10"
            />
            <div className="absolute text-base/9 top-10 right-3">
              <span>${formatNumber2digits(ethPrice ? parseFloat(ethPrice) * ethereum : 0)}</span>
            </div>
          </div>
          {description && <p className="text-light mt-5">{description}</p>}
          <div className="flex flex-row items-center text-[#97AAB5] my-2">
            <span className="mr-2">
              <Trans>Proceeds from sale</Trans>
            </span>
            <ETHWhite />
            <span className="text-[#A1AFBA] ml-1">
              {proceedsFrSale
                ? String(proceedsFrSale).length > 8
                  ? proceedsFrSale.toFixed(8)
                  : proceedsFrSale
                : 0}
            </span>
          </div>
          <div className="flex flex-row items-center text-[#97AAB5]">
            <span className="">
              <Trans>Creator earnings</Trans>
            </span>
            <Tooltip>
              <Tooltip.Trigger asChild className="focus:outline-none cursor-pointer">
                <div className="flex flex-row items-center">
                  <InfoCircle className="ml-1 mr-3" />
                  <ETHWhite />
                  <span className="text-[#A1AFBA] ml-1">
                    {items && ethPrice
                      ? String(+ethPrice - proceedsFrSale).length > 8
                        ? (+ethPrice - proceedsFrSale).toFixed(8)
                        : +ethPrice - proceedsFrSale
                      : 0}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content side="top" className="bg-base/5 max-w-[256px] ml-5">
                <Tooltip.Arrow className="fill-base/5 " width={16} height={8} />
                <p className="text-base/9">
                  <Trans>The creator of this collection will earn</Trans>
                  {' ' +
                    (items?.fee.length && items?.fee.length > 0 ? +items?.fee[0]?.percentage : 0) +
                    '% '}
                  <Trans>of every sale.</Trans>
                </p>
              </Tooltip.Content>
            </Tooltip>
          </div>
          <div className="flex flex-row items-center text-[#97AAB5] my-2">
            <span className="mr-2">
              <Trans>Proceeds from sale</Trans>
            </span>
            <ETHWhite />
            <span className="text-[#A1AFBA] ml-1">
              {proceedsFrSale
                ? String(proceedsFrSale).length > 8
                  ? proceedsFrSale.toFixed(8)
                  : proceedsFrSale
                : 0}
            </span>
          </div>
          <div className="flex flex-row items-center text-[#97AAB5]">
            <span className="">
              <Trans>Creator earnings</Trans>
            </span>
            <Tooltip>
              <Tooltip.Trigger asChild className="focus:outline-none cursor-pointer">
                <div className="flex flex-row items-center">
                  <InfoCircle className="ml-1 mr-3" />
                  <ETHWhite />
                  <span className="text-[#A1AFBA] ml-1">
                    {items && ethPrice
                      ? String(+ethPrice - proceedsFrSale).length > 8
                        ? (+ethPrice - proceedsFrSale).toFixed(8)
                        : +ethPrice - proceedsFrSale
                      : 0}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content side="top" className="bg-base/5 max-w-[256px] ml-5">
                <Tooltip.Arrow className="fill-base/5 " width={16} height={8} />
                <p className="text-base/9">
                  <Trans>The creator of this collection will earn</Trans>
                  {' ' +
                    (items?.fee.length && items?.fee.length > 0 ? +items?.fee[0]?.percentage : 0) +
                    '% '}
                  <Trans>of every sale.</Trans>
                </p>
              </Tooltip.Content>
            </Tooltip>
          </div>
          <div className="mt-8">
            <Button
              onClick={handleSubmit(onHandleSubmit, onHandleError)}
              disabled={!canConfirm}
              className={clsx('btn-lg  w-full px-10', BUTTON_BG)}>
              {isConfirmButton && <ProgressIcon size={23} />}
              <span className="ml-1">{defaultModal.titleConfirm}</span>
            </Button>
            <Button onClick={onClose} className="w-full mt-4 btn-lg text-brand-white ">
              <Trans>CANCEL</Trans>
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
