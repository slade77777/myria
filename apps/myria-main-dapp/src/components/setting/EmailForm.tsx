import Input from '../Input';
import { t, Trans } from '@lingui/macro';
import { useAuthenticationContext } from '../../context/authentication';
import apiClient from '../../client';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Modal from 'src/components/Modal';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckIcon from '../icons/CheckIcon';
import { Loading } from '../Loading';
import WarningIcon from '../icons/WarningIcon';
import * as Tooltip from '@radix-ui/react-tooltip';
import { memo, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

const emailSchema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`)
  })
  .required();

const EmailForm = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: 'onChange'
  });
  const { account, accountProfileQuery } = useAuthenticationContext();
  useEffect(() => {
    if (account?.email) {
      setValue('email', account.email);
    }
  }, [account?.email, setValue]);

  const { mutate, isLoading } = useMutation(
    (newEmail: string) =>
      apiClient.post(`/accounts/email`, {
        email: newEmail,
        redirect: 1
      }),
    {
      onSuccess: (res) => {
        setShowConfirm(true);
        toast('Email linked successfully, please check your email to complete', {
          type: 'success'
        });
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
    }
  );

  const updateMail = useCallback(
    (data: any) => {
      mutate(data.email);
    },
    [mutate]
  );

  const canUpdate =
    !accountProfileQuery?.isFetching && account && !account.normalized_email && isValid;

  return (
    <div className="pl-6 pt-2">
      <p className="text-base/9 mb-2">Email</p>
      <div className="relative">
        <Input
          placeholder={t`Email`}
          {...register('email')}
          error={!!errors.email}
          errorText={errors.email?.message}
          containerClassName="relative"
          disabled={!!account?.normalized_email}
        />
        {account?.email && (
          <div className="absolute right-3 top-2">
            {account?.normalized_email ? (
              <CheckIcon size={30} className="text-white text-success/6" />
            ) : (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <WarningIcon fill="#F2DC8A" size={30} />
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top" sideOffset={5}>
                    <div className="text-white bg-warning/6 p-2 rounded">
                      <Trans>Unverified</Trans>
                    </div>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </div>
        )}
      </div>
      <button
        className={clsx('btn-lg mt-4 w-56', canUpdate ? 'cursor-pointer btn-primary' : 'bg-gray/4')}
        onClick={canUpdate ? handleSubmit(updateMail) : undefined}>
        {isLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <Trans>SEND VERIFICATION</Trans>
        )}
      </button>
      <Modal open={showConfirm} onOpenChange={() => setShowConfirm(false)}>
        <Modal.Content className="z-[5000] shadow-[0_0_40px_10px_#0000004D]">
          <div className="text-left text-[24px] font-bold text-white px-4">
            Email confirmation sent
          </div>

          <p className="mt-2 px-4 text-[16px] text-base/9 pb-4">
            Please check your inbox and follow the link to confirm your email.
          </p>
          <div className="p-4">
            <button
              className="btn-lg btn-primary mt-4 w-full cursor-pointer"
              onClick={() => setShowConfirm(false)}>
              <Trans>OK</Trans>
            </button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default memo(EmailForm);
