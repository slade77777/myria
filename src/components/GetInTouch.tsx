import React, { useState } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiClient from 'src/client';
import CircleCheck from './icons/CircleCheck';

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().trim().required('Name is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    subject: yup.string().trim().required('Subject is required!'),
    message: yup.string().trim().required('Message is required!')
  })
  .required();

const GetInTouch: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setIsSubmitSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
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

    } catch (error: any) {
      setError(error?.message);
      setIsSubmitSuccess(false);
    }
  };

  return (
    <div className="rounded-[20px] bg-[url('/images/get-in-touch/panel.png')] bg-cover bg-center md:py-[64px] p-[32px] md:px-[100px] lg:px-[216px] w-full">
      <h2 className="text-center heading-sm md:heading-md">Get in touch</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid md:grid-cols-2 gap-[32px] gap-x-[28px] mt-[48px]">
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
                Thank you for message. We will be in touch within 24-48 hours!
              </span>
            </p>
          )}
          {error && <p className="text-xs leading-[15px] text-[#F37272]">{error}</p>}
        </div>
        <div className="flex justify-end mt-6">
          <button disabled={isSubmitting} className="btn-lg btn-primary">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
