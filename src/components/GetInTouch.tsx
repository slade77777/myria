import React, { useState } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiClient from 'src/client';
import CircleCheck from './icons/CircleCheck';
import { t, Trans } from '@lingui/macro';

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(t`Name is required!`),
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
    subject: yup
      .string()
      .trim()
      .required(t`Subject is required!`),
    message: yup
      .string()
      .trim()
      .required(t`Message is required!`)
  })
  .required();

const GetInTouch: React.FC = () => {
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
        .post('/contact-us', data)
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
    <div className="w-full rounded-[20px] bg-[url('/images/get-in-touch/panel_op.png')] bg-cover bg-center p-[32px] md:py-[64px] md:px-[100px] lg:px-[216px]">
      <h2 className="heading-sm text-center md:heading-md">Get in touch</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mt-[48px] grid gap-[32px] gap-x-[28px] md:grid-cols-2">
          <Input
            placeholder="Name"
            {...register('name')}
            error={!!errors.name}
            errorText={errors.name?.message}
          />
          <Input
            placeholder="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            errorText={errors.email?.message}
          />
          <Input
            placeholder="Subject"
            containerClassName="md:col-span-2"
            {...register('subject')}
            error={!!errors.subject}
            errorText={errors.subject?.message}
          />
          <Textarea
            placeholder="Message"
            containerClassName="md:col-span-2"
            className="h-[180px]"
            {...register('message')}
            error={!!errors.message}
            errorText={errors.message?.message}
          />
          {success && (
            <p className="flex items-center text-xs leading-[15px] text-white">
              <CircleCheck />
              <span className="ml-1">
                <Trans>Thank you for message. We will be in touch within 24-48 hours!</Trans>
              </span>
            </p>
          )}
          {error && <p className="text-xs leading-[15px] text-[#F37272]">{error}</p>}
        </div>
        <div className="mt-6 flex justify-end">
          <button disabled={isSubmitting} className="btn-lg btn-primary">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
