import Axios from 'axios';
import * as yup from 'yup';
import React, { useState } from 'react';
import apiClient, { additionalApiClient } from 'src/client';
import CircleCheck from './icons/CircleCheck';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const Subscribe: React.FC = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      setError('');

      await additionalApiClient
        .post(`/subscribe`, data)
        .then(() => toast.success('Thank you for subscribing!'))
        .catch((error) => {
          setError(error.message);
        });
      reset();
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <div
      style={{
        boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
      }}
      className="mx-auto flex max-w-content flex-col items-center rounded-[20px] bg-[url('/images/games/panel_op.jpeg')] bg-cover bg-center p-[32px] md:py-[158px]">
      <h2 className="heading-list leading-[30px] md:heading-lg md:mt-4">
        <Trans>Pre register to stay up to date</Trans>
      </h2>
      <div className="mt-6 w-full max-w-[585px] ">
        <p className="max-w-[616px] text-base leading-6 text-light">
          <Trans>
            Sign up to our newsletter to receive development updates, token and NFT drops, and
            exclusive promotions.
          </Trans>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
            <Input
              placeholder={t`Enter your email address`}
              {...register('email')}
              error={!!errors.email || !!error}
              errorText={errors.email?.message || error}
              containerClassName="relative"
            />
            <button className="btn-lg btn-primary" disabled={isSubmitting}>
              <Trans>SUBMIT</Trans>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
