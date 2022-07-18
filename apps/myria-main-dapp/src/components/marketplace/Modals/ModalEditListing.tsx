import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import { AssetDetailsResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/core/Button';
import DAOIcon from 'src/components/icons/DAOIcon';
import ProgressIcon from 'src/components/icons/ProgressIcon';
import Input from 'src/components/Input';
import Modal from 'src/components/Modal';
import { formatNumber2digits, validatedImage } from 'src/utils';
import * as yup from 'yup';

interface Props {
  title: string;
  open: boolean;
  onClose?: () => void;
  ethereum?: number;
  description?: string;
  titleConfirm?: string;
  labelInput: string;
  items?: AssetDetailsResponse;
  imgSrc?: string;
  onSubmit: (data: IFormInputs) => void;
}

interface IFormInputs {
  price: string;
}

export const ModalEditListing: React.FC<Props> = ({
  title,
  description,
  labelInput,
  imgSrc,
  titleConfirm = 'CONFIRM',
  ethereum = 1000,
  open,
  onClose,
  items,
  onSubmit
}) => {
  const schema = yup
    .object({
      price: yup.string().required(t`Price is required!`)
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitSuccessful }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const ethPrice = watch('price');
  const BUTTON_BG = useMemo(() => {
    return (isDirty || isValid) && !isSubmitSuccessful ? 'btn-primary' : 'btn-disabled';
  }, [isDirty, isValid, isSubmitSuccessful]);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={title} className="shadow-[0_0_40px_10px_#0000004D] ">
        <form className="p-[24px] pt-[32px]">
          <div className="flex items-center gap-6  rounded-[8px] bg-base/4 p-[16px] ">
            <div>
              <img className=" rounded-[6px]" src={imgSrc} width={120} height={120} />
            </div>
            <div>
              <p className="text-[14px] text-light ">
                <Trans>{items?.collectionName}</Trans>
              </p>
              <p className="my-2 text-[18px] font-bold">
                <Trans>{items?.name}</Trans>
              </p>
              <p className="text-[14px] text-light">
                <Trans>Token ID: {items?.tokenId}</Trans>
              </p>
            </div>
          </div>
          <p className="mt-2 text-[14px] text-light">
            <Trans> Collection avg. price: 2.00 ETH </Trans>{' '}
          </p>
          <div className="relative mt-8">
            <span className="text-light">
              <Trans> {labelInput} </Trans>
            </span>
            <div className="absolute top-10 left-2">
              <DAOIcon />
            </div>
            <Input
              type="text"
              {...register('price')}
              placeholder={ethPrice ? ethPrice : '0.00'}
              autoComplete="off"
              error={!!errors.price}
              errorText={errors.price?.message}
              className="mt-1 pr-[100px] rounded-[5px] border-none bg-base/4 pl-10 "
            />
            <div className="absolute top-10 right-3">
              <span>${formatNumber2digits(ethPrice ? parseFloat(ethPrice) * ethereum : 0)}</span>
            </div>
          </div>
          {description && <p className="mt-5 text-light">{description}</p>}
          <div className="mt-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
              className={clsx('btn-lg  w-full px-10', BUTTON_BG)}>
              {isSubmitSuccessful && <ProgressIcon size={23} />}
              <span className="ml-1">
                <Trans>{titleConfirm}</Trans>
              </span>
            </Button>
            <Button onClick={onClose} className="btn-lg mt-4 w-full text-brand-white ">
              <Trans>CANCEL</Trans>
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
