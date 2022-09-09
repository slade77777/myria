import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import { AssetDetailsResponse } from 'myria-core-sdk';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/core/Button';
import DAOIcon from 'src/components/icons/DAOIcon';
import ProgressIcon from 'src/components/icons/ProgressIcon';
import Input from 'src/components/Input';
import Modal from 'src/components/Modal';
import { formatNumber2digits } from 'src/utils';
import * as yup from 'yup';
import { AssetStatus } from '../AssetDetails';

interface Props {
  // title: string;
  open: boolean;
  onClose?: () => void;
  ethereum?: number;
  description?: string;
  // titleConfirm?: string;
  // labelInput: string;
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
    formState: { errors, isDirty, isValid, isSubmitSuccessful }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const ethPrice = watch('price');
  const canConfirm = !isNaN(parseFloat(ethPrice)) && parseFloat(ethPrice) >= MINIMUM_PRICE;

  const BUTTON_BG = useMemo(() => {
    return (isDirty || isValid) && !isSubmitSuccessful && canConfirm
      ? 'btn-primary'
      : 'btn-disabled';
  }, [isDirty, isValid, isSubmitSuccessful, canConfirm]);

  const defaultModal =
    status === AssetStatus.MODIFY
      ? {
          title: 'Modify Listing',
          titleConfirm: <Trans>CONFIRM CHANGE</Trans>,
          labelInput: <Trans>Listing Price</Trans>
        }
      : {
          title: 'List your item for sale',
          titleConfirm: <Trans>CONFIRM LISTING</Trans>,
          labelInput: <Trans>Listing Price</Trans>
        };

  const onHandleSubmit = (value: any) => {
    setIsConfirmButton(true);
    onSubmit(value);
  };

  const onHandleError = (errors: any) => {
    setIsConfirmButton(false);
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={defaultModal.title} className="shadow-[0_0_40px_10px_#0000004D] ">
        <form className="p-6 pt-8">
          <div className="bg-base/4 flex items-center  gap-6 rounded-lg p-4">
            <div className="relative w-32">
              <img className="z-10 rounded-[6px]" src={imgSrc} />
              <div
                className="z-1 absolute top-0 h-full w-full rounded-xl opacity-[0.3]"
                style={{ backgroundColor: rarityColor }}
              />
            </div>
            <div>
              <p className="text-light text-sm">
                <Trans>{items?.collectionName}</Trans>
              </p>
              <p className="my-2 text-[18px] font-bold">
                <Trans>{items?.name}</Trans>
              </p>
              <p className="text-light text-sm">
                <Trans>Token ID:</Trans> {items?.tokenId}
              </p>
            </div>
          </div>
          <p className="text-light mt-2 text-sm">
            <Trans> Collection avg. price: 2.00 ETH </Trans>{' '}
          </p>
          <div className="relative mt-8">
            <span className="text-light">{defaultModal.labelInput}</span>
            <div className="absolute top-10 left-2">
              <DAOIcon />
            </div>
            <Input
              type="text"
              {...register('price', {
                required: true,
                onChange: (e) => {
                  if (parseFloat(e.target.value) < MINIMUM_PRICE) {
                    setError('price', { message: `Minimum is ${MINIMUM_PRICE} price` });
                  } else {
                    clearErrors('price');
                  }
                }
              })}
              placeholder={ethPrice ? ethPrice : '0.00'}
              autoComplete="off"
              error={!!errors.price}
              errorText={errors.price?.message}
              className="bg-base/4 mt-1 rounded-lg border-none pr-[100px] pl-10"
            />
            <div className="absolute top-10 right-3 text-base/9">
              <span>${formatNumber2digits(ethPrice ? parseFloat(ethPrice) * ethereum : 0)}</span>
            </div>
          </div>
          {description && <p className="text-light mt-5">{description}</p>}
          <div className="mt-8">
            <Button
              onClick={handleSubmit(onHandleSubmit, onHandleError)}
              disabled={!canConfirm}
              className={clsx('btn-lg  w-full px-10', BUTTON_BG)}>
              {isConfirmButton && <ProgressIcon size={23} />}
              <span className="ml-1">{defaultModal.titleConfirm}</span>
            </Button>
            <Button onClick={onClose} className="btn-lg text-brand-white mt-4 w-full ">
              <Trans>CANCEL</Trans>
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
