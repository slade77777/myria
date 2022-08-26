import cn from 'classnames';

import { ThreeDotsVerticalIcon } from '../Icons';
import EmailIcon from '../Icons/EmailIcon';
import React, { useCallback } from 'react';
import Input from 'src/components/Input';
import { t, Trans } from '@lingui/macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from 'src/components/Modal';
import apiClient from 'src/client';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Loading } from 'src/components/Loading';

type Props = {
  modalShow: boolean;
  closeModal: () => void;
  position?: string;
};

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
  })
  .required();

const linkEmail = (email: string) => {
  return apiClient.post(`/accounts/email`, { email, redirect: 1 });
};

const ModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { mutate: linkAccountEmail, isLoading } = useMutation(linkEmail, {
    onSuccess: res => {
      closeModal();
      toast('Email linked successfully, please check your email to complete', {
        type: 'success',
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.[0]?.detail;
      if (message === 'Invalid Role') {
        closeModal();
        toast("We've already got your email!", {
          type: 'success',
        });
        localStorage.setItem('emailRequestNumber', '10');
      } else {
        toast(message || 'Something error, please try later', {
          type: 'error',
        });
      }
    },
  });

  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      linkAccountEmail(data.email);
    },
    [linkAccountEmail],
  );

  return (
    <div className="pt-10">
      <div className="flex justify-center">
        <EmailIcon />
      </div>

      <div className="mt-6 text-center text-[24px] font-bold text-white">
        Add an email to your account
      </div>

      <div className="mt-6 px-[20px] text-center text-[16px] text-white">
        <p className="text-base/9">
          Enter your email address to get notifications about wallet
          transactions and marketplace trades.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mx-8 mt-6">
          <Input
            placeholder={t`Enter your email address`}
            {...register('email')}
            error={!!errors.email}
            errorText={errors.email?.message}
            containerClassName="relative"
          />
          <button
            className="btn-lg btn-primary mt-4 w-full"
            disabled={isSubmitting}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : (
              <Trans>SUBMIT</Trans>
            )}
          </button>
        </div>
      </form>

      <div className="mt-20 mb-4 flex justify-center px-[32px]">
        <p className="cursor-pointer font-bold text-white" onClick={closeModal}>
          I’ll do this later
        </p>
      </div>
    </div>
  );
};

export default function RequestEmailModal({
  modalShow,
  closeModal,
  position,
}: Props) {
  if (position === 'top-left') {
    return (
      <div className={cn(modalShow ? 'block' : 'hidden')}>
        <div className="absolute -bottom-[30px] left-1/2 z-30 h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230] bg-[#081824]" />
        <div className="absolute top-16 right-16 max-h-[80vh] w-[406px] overflow-auto rounded-[20px] border border-[#202230] bg-[#081824] py-6">
          <div className="flex items-center justify-end px-4">
            <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
          </div>
          <ModalContent closeModal={closeModal} />
        </div>
      </div>
    );
  }

  return (
    <Modal open={modalShow} onOpenChange={closeModal}>
      <Modal.Content className="z-[5000] shadow-[0_0_40px_10px_#0000004D]">
        <ModalContent closeModal={closeModal} />
      </Modal.Content>
    </Modal>
  );
}
