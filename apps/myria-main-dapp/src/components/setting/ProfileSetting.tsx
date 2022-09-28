import React, { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import clsx from 'clsx';
import { Loading } from '../Loading';
import { useMutation } from 'react-query';
import apiClient from '../../client';
import { toast } from 'react-toastify';
import { useAuthenticationContext } from '../../context/authentication';

const schema = yup
  .object({
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    username: yup.string().optional()
  })
  .required();

const ProfileSetting = () => {
  const { account, accountProfileQuery } = useAuthenticationContext();
  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: account
  });

  const { mutate, isLoading } = useMutation((data: any) => apiClient.put(`/accounts/users`, data), {
    onSuccess: (res) => {
      toast('Update information successfully!', {
        type: 'success'
      });
      accountProfileQuery.refetch();
    },
    onError: (err: any) => {
      const message = err?.response?.data?.errors?.[0]?.detail;
      toast(message || 'Something error, please try later', {
        type: 'error'
      });
    }
  });

  const updateUser = useCallback(
    (data: any) => {
      mutate({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username
      });
    },
    [mutate]
  );
  const canUpdate = isValid && !isSubmitting && isDirty;

  return (
    <div className="w-full bg-base/3 p-8">
      <p className="text-white text-3xl font-bold">Profile Setting</p>
      <div className="mt-8 flex flex-row gap-8 items-center">
        <img width={200} height={200} src="/images/marketplace/user.png" alt="" />
        <div className="py-2 border-white border-2 mt-8 rounded-lg w-48 cursor-pointer">
          <p className="text-center font-bold">CHANGE</p>
        </div>
        <div className="py-2 border-white border-2 mt-8 rounded-lg w-48 cursor-pointer">
          <p className="text-center font-bold">REMOVE</p>
        </div>
      </div>

      <div className="w-1/2 mt-12">
        <p className="text-base/9">First Name</p>
        <Input
          placeholder={t`Your first name`}
          {...registerForm('first_name')}
          error={!!errors.first_name}
          errorText={errors.first_name?.message}
          className="mt-2"
        />
        <p className="text-base/9 mt-4">Last Name</p>
        <Input
          placeholder={t`Your last name`}
          {...registerForm('last_name')}
          error={!!errors.last_name}
          errorText={errors.last_name?.message}
          className="mt-2"
        />
        <p className="text-base/9 mt-4">username</p>
        <Input
          placeholder={t`Your username`}
          {...registerForm('username')}
          error={!!errors.username}
          errorText={errors.username?.message}
          className="mt-2"
        />
        <button
          className={clsx(
            'btn-lg mt-6 w-56',
            canUpdate ? 'cursor-pointer btn-primary' : 'bg-gray/4'
          )}
          onClick={canUpdate ? handleSubmit(updateUser) : undefined}>
          {isLoading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <Trans>SAVE CHANGES</Trans>
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(ProfileSetting);
