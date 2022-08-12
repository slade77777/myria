import { t, Trans } from '@lingui/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import Input from '../Input';
import Select from '../select';
import Textarea from '../Textarea';
import { useForm, Controller } from 'react-hook-form';
import { useGA4 } from 'src/lib/ga';
import apiClient, { salesforceAPIClient } from 'src/client';
import CircleCheck from '../icons/CircleCheck';

interface IFormInputs {
  name: string;
  fromEmail: string;
  subject: string;
  message: string;
  company: string;
  website: string;
  companySize: any;
  chain: string;
  description: string;
}

type Props = {
  onClose: () => void;
};

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(t`Name is required!`),
    chain: yup
      .string()
      .trim()
      .required(t`Chain is required!`),
    company: yup
      .string()
      .trim()
      .required(t`Studio/Company is required!`),
    companySize: yup
      .object()
      .nullable()
      .required(t`Company Size is required!`),
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
    description: yup
      .string()
      .trim()
      .required(t`Message is required!`)
  })
  .required();

const BuildYourBlockchain: React.FC<Props> = ({ onClose }: Props) => {
  const inputClassName = 'border-none bg-[#0B2231] text-[14px] focus:shadow-[0_0_0_1px_#9AC9E3]';
  const { event } = useGA4();
  const [error, setError] = useState('');
  const [success, setIsSubmitSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      setError('');
      setIsSubmitSuccess(false);
      data.subject = `Build with Myria`;

      event('B2B Contact Form Submitted', {
        campaign: 'B2B',
        name: data.name,
        email: data.fromEmail,
        company: data.company,
        website: data.website,
        company_size: data.companySize?.name,
        current_chain: data.chain,
        project_info: data.message
      });

      const params: any = {
        encoding: 'UTF-8',
        oid: '00D5j00000B9arN',
        retURL: 'https://myria-dev.nonprod-myria.com/for-developers/',
        first_name: data.name,
        email: data.fromEmail,
        company: data.company,
        url: data.website,
        revenue: data.companySize?.name,
        '00N5j00000Iydwc': data.chain,
        description: data.description
      };
      const url = Object.keys(params).reduce((previousValue, currentValue) => {
        if (previousValue) return previousValue + `&${currentValue}=${params[currentValue]}`;
        else return `${currentValue}=${params[currentValue]}`;
      }, '');

      const result = await salesforceAPIClient.post(`/servlet.WebToLead?${url}`);
      reset();
      onClose();
    } catch (error: any) {
      reset();
      onClose();
    }
  };

  return (
    <div>
      <form
        className="mx-auto mt-8 max-w-[616px] space-y-6 md:mt-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          {...register('name')}
          error={!!errors.name}
          errorText={errors.name?.message}
          className={inputClassName}
          type="text"
          placeholder="Name"
        />
        <Input
          className={inputClassName}
          error={!!errors.fromEmail}
          {...register('fromEmail')}
          errorText={errors.fromEmail?.message}
          type="email"
          placeholder="Email"
        />
        <Input
          className={inputClassName}
          error={!!errors.company}
          {...register('company')}
          errorText={errors.company?.message}
          type="text"
          placeholder="Studio/Company Name"
        />
        <Input
          className={inputClassName}
          error={!!errors.website}
          {...register('website')}
          errorText={errors.website?.message}
          type="text"
          placeholder="Website"
        />
        <Controller
          control={control}
          defaultValue=""
          {...register('companySize')}
          name="companySize"
          render={({ field: { onChange } }) => (
            <Select
              error={!!errors.companySize}
              errorText={errors.company?.message}
              changeHandler={onChange}
            />
          )}
        />
        <Input
          className={inputClassName}
          error={!!errors.chain}
          errorText={errors.chain?.message}
          type="text"
          {...register('chain')}
          placeholder="Current Chain (if applicable)"
        />
        <Textarea
          className={clsx(inputClassName, 'h-[200px]')}
          placeholder="Tell us more about your project, needs, and timing"
          {...register('description')}
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
        <button className="btn-lg btn-primary !mt-8 flex w-full justify-center">
          {isSubmitting ? <Trans>Submitting...</Trans> : <Trans>Submit</Trans>}
        </button>
      </form>
    </div>
  );
};

export default BuildYourBlockchain;
