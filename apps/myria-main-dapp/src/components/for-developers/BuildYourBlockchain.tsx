import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import { useForm } from 'react-hook-form';
import apiClient, { additionalApiClient } from 'src/client';
import CircleCheck from '../icons/CircleCheck';

interface IFormInputs {
  name: string;
  fromEmail: string;
  subject: string;
  message: string;
  company: string;
  website: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(t`Name is required!`),
    website: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        t`Please enter correct url!`
      )
      .required('Please enter website'),
    fromEmail: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
    message: yup
      .string()
      .trim()
      .required(t`Message is required!`)
  })
  .required();

const BuildYourBlockchain: React.FC = () => {
  const inputClassName = 'border-none bg-[#172630] focus:shadow-[0_0_0_1px_#9AC9E3]';
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

      data.subject = `Build with Myria`;
      await additionalApiClient
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
    <div>
      <div className="mx-auto max-w-[723px] text-center">
        <h2 className="text-[32px] font-bold leading-[1.25] md:text-[40px]">
          <Trans>Build your blockchain game with Myria</Trans>
        </h2>
        <p className="mt-6 text-[18px] leading-[1.5] text-light md:mt-10 md:text-[20px]">
          <Trans>
            We would love to hear from you. Contact us and get started with your blockchain gaming
            journey today.
          </Trans>
        </p>
      </div>
      <form
        className="mx-auto mt-8 max-w-[616px] space-y-6 md:mt-[65px]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <Input
          className={inputClassName}
          type="text"
          placeholder="Name"
          {...register('name')}
          error={!!errors.name}
          errorText={errors.name?.message}
        />
        <Input
          className={inputClassName}
          type="email"
          placeholder="Email"
          {...register('fromEmail')}
          error={!!errors.fromEmail}
          errorText={errors.fromEmail?.message}
        />
        <Input
          className={inputClassName}
          type="text"
          placeholder="Company"
          {...register('company')}
          error={!!errors.company}
          errorText={errors.company?.message}
        />
        <Input
          className={inputClassName}
          type="text"
          placeholder="Website"
          {...register('website')}
          error={!!errors.website}
          errorText={errors.website?.message}
        />
        <Textarea
          className={clsx(inputClassName, 'h-[200px]')}
          placeholder="Message"
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
        <button
          disabled={isSubmitting}
          className="btn-lg btn-primary !mt-8 flex w-full justify-center">
          {isSubmitting ? <Trans>Submitting...</Trans> : <Trans>Submit</Trans>}
        </button>
      </form>
    </div>
  );
};

export default BuildYourBlockchain;
