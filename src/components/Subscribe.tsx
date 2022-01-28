import Axios from 'axios';
import * as yup from 'yup';
import React, { useState } from 'react';
import apiClient from 'src/client';
import CircleCheck from './icons/CircleCheck';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email!').required('Email is required!')
  })
  .required();

const Subscribe: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setIsSubmitSuccess] = useState<boolean>(false);
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
      setIsSubmitSuccess(false);

      await apiClient
        .put('/subscription', data)
        .then(() => setIsSubmitSuccess(true))
        .catch((error) => {
          setError(error.message);
          setIsSubmitSuccess(false);
        });
        reset();
    } catch (error: any) {
      setError(error?.message);
      setIsSubmitSuccess(false);
    }
  };

  return (
    <div
      style={{
        boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
      }}
      className="max-w-content mx-auto bg-[url('/images/games/panel.png')] bg-cover bg-center rounded-[20px] flex flex-col items-center md:py-[158px] p-[32px]">
      <h2 className="text-center heading-sm md:heading-md">Pre register to stay up to date</h2>
      <div className="max-w-[585px] w-full mt-6 ">
        <p className="text-center body text-light">
          Sign up to our newsletter to for development updates, token and NFT drops, and exclusive
          promotions.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] mt-10 gap-4">
            <Input
              placeholder="Enter your email address"
              {...register('email')}
              error={!!errors.email || !!error}
              errorText={errors.email?.message || error}
              containerClassName="relative"
              message={
                success ? (
                  <p className="flex items-center text-xs leading-[15px] text-white absolute bottom-[-20px]">
                    <CircleCheck />
                    <span className="ml-1">Thank you for subscribing!</span>
                  </p>
                ) : null
              }
            />
            <button className="btn-lg btn-primary" disabled={isSubmitting}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
