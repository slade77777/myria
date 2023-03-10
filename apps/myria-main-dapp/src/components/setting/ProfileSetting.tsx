import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import clsx from 'clsx';
import { Loading } from '../Loading';
import { useMutation } from 'react-query';
import apiClient, { accountApiClient } from '../../client';
import { toast } from 'react-toastify';
import { useAuthenticationContext } from '../../context/authentication';
import axios from 'axios';

const schema = yup
  .object()
  .shape({
    first_name: yup.string().required('First Name is a required field.'),
    last_name: yup.string().required('Last Name is a required field.'),
    username: yup
      .string()
      .required('Username is a required field.')
      .matches(
        /^(?=.{3,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/,
        'Username should be 3-10 characters and not include special characters '
      )
  })
  .required();

const MAX_FILE_SIZE = 1024 ** 2 * 5;

const ProfileSetting = () => {
  const { account, accountProfileQuery } = useAuthenticationContext();
  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return account;
    }, [account])
  });
  const inputFile = useRef<any>(null);
  const [isUploading, setUpload] = useState(false);

  useEffect(() => {
    reset(account);
  }, [account, reset]);

  const { mutate, isLoading } = useMutation(
    (data: any) => accountApiClient.put(`/accounts/users`, data),
    {
      onSuccess: (res) => {
        toast('Settings updated', {
          type: 'success'
        });
        accountProfileQuery.refetch();
      },
      onError: (err: any) => {
        const message = err?.response?.data?.errors?.[0]?.detail;
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  );

  const { mutate: deleteAvatar, isLoading: isRemoving } = useMutation(
    (data: any) => apiClient.delete('/accounts/images'),
    {
      onSuccess: (res) => {
        toast('Delete avatar successfully!', {
          type: 'success'
        });
        accountProfileQuery.refetch();
      },
      onError: (err: any) => {
        const message = err?.response?.data?.errors?.[0]?.detail;
        toast(message || 'Error, please try later', {
          type: 'error'
        });
      }
    }
  );

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

  const updateAvatar = useCallback(() => {
    inputFile.current?.click();
  }, []);

  const onChangeFile = useCallback(
    async (event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const [type] = file.type.split('/');
      if (!type || type !== 'image') {
        return toast.error('You can only upload image file!');
      }
      if (file.size > MAX_FILE_SIZE) {
        return toast.error('File is too large, maximum allowed size - 5 MB.');
      }
      try {
        setUpload(true);
        const preSignedRes = await apiClient.get(`/accounts/images/upload-url/${file.name}`);
        const { presigned_url, image_name } = preSignedRes?.data?.data;
        if (presigned_url && image_name) {
          await axios.put(presigned_url, file);
          const response = await apiClient.post('/accounts/images', {
            image_name
          });
          if (response?.data?.data?.image_url) {
            toast.success('Update avatar successfully!');
            accountProfileQuery.refetch();
          }
        } else {
          throw new Error('Presigned url is not valid!');
        }
      } catch (e) {
        toast.error('Error, please try again later!');
      }
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
      setUpload(false);
    },
    [accountProfileQuery]
  );

  return (
    <div className="w-full bg-base/3 p-8">
      <p className="text-white text-3xl font-bold">Profile Settings</p>
      <input type="file" id="file" ref={inputFile} className="hidden" onChange={onChangeFile} />
      <div className="mt-8 flex flex-row gap-8 items-center">
        <img
          className="rounded-full object-cover w-48 h-48"
          src={account?.image_url || '/images/marketplace/user.png'}
          alt=""
        />
        {isUploading ? (
          <Loading />
        ) : (
          <div
            onClick={updateAvatar}
            className="py-2 border-white border-2 rounded-lg w-48 cursor-pointer">
            <p className="text-center font-bold">CHANGE</p>
          </div>
        )}
        {isRemoving ? (
          <Loading />
        ) : (
          <div
            onClick={deleteAvatar}
            className="py-2 border-white border-2 rounded-lg w-48 cursor-pointer">
            <p className="text-center font-bold">REMOVE</p>
          </div>
        )}
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
        <p className="text-base/9 mt-4">Username</p>
        <Input
          placeholder={t`Your username`}
          {...registerForm('username')}
          error={!!errors.username}
          errorText={errors.username?.message}
          className="mt-2"
        />
        <button
          className={clsx(
            'btn-lg mt-6 w-56 h-12',
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
