import { t, Trans } from '@lingui/macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from 'src/components/Modal';
import Input from 'src/components/Input';
import React, { useCallback, useMemo } from 'react';
import Button from 'src/components/core/Button';
import { toast } from 'react-toastify';
import TreeIcon from '../../icons/TreeIcon';
import { useMutation } from 'react-query';
import apiClient from '../../../client';
import { useWalletContext } from '../../../context/wallet';

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`)
  })
  .required();

export type WarningNodeType = 'not-verified' | 'not-whitelist' | 'not-valid' | 'not-email';

const linkEmail = (email: string) => {
  return apiClient.post(`/accounts/email`, { email, redirect: 2 });
};

const WhiteListSale = ({
  warningType,
  setWarningType,
  open
}: {
  warningType?: WarningNodeType;
  setWarningType: (val?: WarningNodeType) => void;
  open: boolean;
}) => {
  const { address } = useWalletContext();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const { mutate: linkAccountEmail, isLoading } = useMutation(linkEmail, {
    onSuccess: (res) => {
      setWarningType('not-verified');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.[0]?.detail;
      if (message === 'Invalid Role') {
        toast("We've already got your email!", {
          type: 'success'
        });
      } else {
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  });

  const updateMail = useCallback(
    (data: IFormInputs) => {
      linkAccountEmail(data.email);
      reset();
    },
    [linkAccountEmail, reset]
  );

  const content = useMemo(() => {
    if (warningType === 'not-email') {
      return (
        <div>
          <p className="mb-6 text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>
              Great! You've taken the first step towards becoming a Myria Node owner. Please verify
              your email address to proceed to purchasing your Node!
            </Trans>
          </p>
          <form onSubmit={handleSubmit(updateMail)} noValidate className="w-full">
            <div className="mb-4 w-full">
              <span className="mb-2 block text-[16px] font-normal text-[#A1AFBA]">
                <Trans>Email Address</Trans>
              </span>
              <Input
                label={t`Email Address`}
                placeholder={t`Enter your email`}
                {...register('email')}
                error={!!errors.email}
                errorText={errors.email?.message}
                containerClassName="relative w-full"
              />
            </div>
            <Button className="btn-lg btn-primary w-full px-10">
              <Trans>SUBMIT</Trans>
            </Button>
          </form>
        </div>
      );
    }
    if (warningType === 'not-verified') {
      return (
        <div>
          <p className="text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>Confirmation email sent.</Trans>
          </p>
          <p className="text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>Please check your email and click on the link to verify.</Trans>
          </p>
        </div>
      );
    }
    if (warningType === 'not-whitelist') {
      return (
        <div>
          <p className="text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>
              Oops, it looks like your wallet is not registered on our Whitelist, which means that
              we can’t proceed with your purchase at the moment.
            </Trans>
          </p>
        </div>
      );
    }
    if (warningType === 'not-valid') {
      return (
        <div>
          <p className="mb-6 mx-4 text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>
              Oops, it looks like your wallet is not registered on our Whitelist, which means that
              we can’t proceed with your purchase at the moment.
            </Trans>
          </p>
          <p className="mb-6 mx-4 text-[16px] font-normal text-[#A1AFBA] text-center">
            <Trans>
              Add your email address below and we'll send you an update as soon as our Nodes become
              available to the public.
            </Trans>
          </p>
          <form onSubmit={handleSubmit(updateMail)} noValidate className="w-full">
            <div className="mb-4 w-full">
              <span className="mb-2 block text-[16px] font-normal text-[#A1AFBA]">
                <Trans>Email Address</Trans>
              </span>
              <Input
                label={t`Email Address`}
                placeholder={t`Enter your email`}
                {...register('email')}
                error={!!errors.email}
                errorText={errors.email?.message}
                containerClassName="relative w-full"
              />
            </div>
            <Button className="btn-lg btn-primary w-full px-10">
              <Trans>SUBMIT</Trans>
            </Button>
          </form>
        </div>
      );
    }

    return <div />;
  }, [errors.email, handleSubmit, register, updateMail, warningType]);

  return (
    <Modal open={open}>
      <Modal.Content
        canClose={false}
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[576px]">
        <div className="p-8">
          <div className="mb-6 flex flex-col items-center">
            <TreeIcon />
            <p className="mt-6 text-center text-2xl font-bold text-white">
              <Trans>Myria Node Whitelist Sale</Trans>
            </p>
          </div>
          {content}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default WhiteListSale;
