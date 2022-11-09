import React, { FC, memo, useCallback, useState } from 'react';
import * as yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { validatePassword } from '../../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import clsx from 'clsx';
import { Loading } from '../Loading';
import { useAuthenticationContext } from '../../context/authentication';
import RequestEmailModal from '../../packages/l2-wallet/src/components/Modal/RequestEmailModal';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import apiClient from '../../client';
import { toast } from 'react-toastify';
import Modal from 'src/components/Modal';

yup.addMethod(yup.string, 'validatePassword', function (errorMessage) {
  return this.test(`test-card-type`, '', function (value) {
    const { path, createError } = this;

    if (!value) {
      return createError({ path, message: errorMessage });
    }

    const result = validatePassword(value);

    if (!result) {
      return true;
    } else {
      return createError({ path, message: result });
    }
  });
});

const schema = yup
  .object({
    newPassword: yup
      .string()
      //@ts-ignore
      .validatePassword()
      .required(),
    confirmPassword: yup
      .string()
      //@ts-ignore
      .validatePassword()
      .required()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password must match!')
  })
  .required();

const PasswordForm = () => {
  const { account, accountProfileQuery } = useAuthenticationContext();
  const [requestEmail, setRequestEmail] = useState(false);
  const [emailSent, setRequestSent] = useState(false);
  const router = useRouter();
  const { activeFromEmail } = router.query;

  const updateReady = activeFromEmail === 'true' || !account?.hasPassword;

  const { mutate: updatePassword, isLoading: isUpdating } = useMutation(
    (data: any) => apiClient.post(`/accounts/password`, data),
    {
      onSuccess: (res) => {
        toast('Update password successfully!', {
          type: 'success'
        });
        accountProfileQuery.refetch();
        router.push('/');
      },
      onError: (err: any) => {
        const message = err?.response?.data?.errors?.[0]?.detail;
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  );

  const { mutate: resetPassword, isLoading: isResetting } = useMutation(
    (data: any) => apiClient.post(`/accounts/password/reset`, data),
    {
      onSuccess: (res) => {
        setRequestSent(true);
      },
      onError: (err: any) => {
        const message = err?.response?.data?.errors?.[0]?.detail;
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const submitUpdate = useCallback(
    (data: any) => {
      if (!account?.normalized_email) {
        return setRequestEmail(true);
      }
      updatePassword({
        new_password: data.newPassword,
        new_confirm_password: data.confirmPassword
      });
    },
    [account?.normalized_email, updatePassword]
  );

  const submitReset = useCallback(() => {
    if (!account?.normalized_email) {
      return setRequestEmail(true);
    }
    resetPassword({
      email: account.normalized_email,
      redirect: 4
    });
  }, [account?.normalized_email, resetPassword]);

  return (
    <div className="pl-6 pt-2">
      {updateReady && (
        <div className="pr-4">
          <p className="text-base/9 mb-2">New Password</p>
          <Input
            placeholder={t`Password`}
            {...register('newPassword')}
            error={!!errors.newPassword}
            errorText={errors.newPassword?.message}
            containerClassName="relative"
            type="password"
          />
          <p className="text-base/9 mb-2 mt-6">Re-Enter Password</p>
          <Input
            placeholder={t`Confirm Password`}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
            containerClassName="relative"
            type="password"
          />
        </div>
      )}

      {updateReady ? (
        <button
          className={clsx('btn-lg mt-4 w-56', isValid ? 'cursor-pointer btn-primary' : 'bg-gray/4')}
          onClick={isValid ? handleSubmit(submitUpdate) : undefined}>
          {isUpdating ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <Trans>SAVE CHANGES</Trans>
          )}
        </button>
      ) : (
        <button className="btn-lg w-56 cursor-pointer btn-primary" onClick={submitReset}>
          {isResetting ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <Trans>Reset Password</Trans>
          )}
        </button>
      )}
      <RequestEmailModal
        closeModal={() => setRequestEmail(false)}
        modalShow={requestEmail}
        content="Please add an email below to receive the password update email."
      />
      <Modal open={emailSent} onOpenChange={() => setRequestSent(false)}>
        <Modal.Content className="z-[5000] shadow-[0_0_40px_10px_#0000004D]">
          <div className="m-8">
            <div className="mt-6 text-center text-[24px] font-bold text-white">
              Password update email sent
            </div>

            <div className="mt-6 px-[20px] text-center text-[16px] text-white">
              <p className="text-base/9">
                Please check your inbox and follow the instructions to confirm your password update.
              </p>
            </div>
            <button
              onClick={() => setRequestSent(false)}
              className="btn-lg btn-primary mt-4 w-full">
              <Trans>OK</Trans>
            </button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default memo(PasswordForm);
