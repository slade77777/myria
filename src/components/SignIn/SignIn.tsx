import clsx from 'clsx';
import React, { useState } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import Link from 'next/link';
import EyeIcon from '../icons/EyeIcon';
import { useAuthenticationContext } from 'src/context/authentication';

interface IFormSignInInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
    password: yup
      .string()
      .trim()
      .required(t`Password is required!`)
  })
  .required();

const SignIn: React.FC = () => {
  const { register } = useAuthenticationContext();
  const [error, setError] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormSignInInput>({
    resolver: yupResolver(schema)
  });

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onSubmit = async (data: IFormSignInInput) => {
    console.log(data);
    try {
      setError('');
      // setIsSubmitSuccess(false);

      // await apiClient
      //   .put('/subscription', data)
      //   .then(() => setIsSubmitSuccess(true))
      //   .catch((error) => {
      //     setError(error.message);
      //     setIsSubmitSuccess(false);
      //   });
      reset();
    } catch (error: any) {
      setError(error?.message);
      // setIsSubmitSuccess(false);
    }
  };

  const onClickSignUp = () => {
    register();
  };

  return (
    <div className="px-8">
      <p className="body mt-7 text-white">Sign in to your account</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2">
          <Input
            placeholder={t`Enter your email`}
            {...registerForm('email')}
            error={!!errors.email || !!error}
            errorText={errors.email?.message || error}
            className="mt-7"
          />
          <div className="relative">
            <Input
              placeholder={t`Enter your password`}
              {...registerForm('password')}
              error={!!errors.password}
              errorText={errors.password?.message}
              className="w-full pr-9"
              containerClassName="mt-6"
              type={visiblePassword ? 'text' : 'password'}
            />
            <span
              className="absolute top-[17px] right-2 cursor-pointer"
              onClick={toggleVisiblePassword}>
              <EyeIcon />
            </span>
          </div>
        </div>
        <Link href="/" passHref>
          <a className="text-brand-gold">Forgot your password?</a>
        </Link>
        <button className="btn-lg btn-primary mt-8 w-full">
          <Trans>Sign in</Trans>
        </button>
        <div className="mt-6 mb-8 text-center">
          <div className="text-light">
            {t`Don’t have an account?`}{' '}
            <span className="text-gold">
              {/* <Link href="/" passHref> */}
              <a className="text-brand-gold hover:cursor-pointer" onClick={onClickSignUp}>
                <Trans>Sign up now</Trans>
              </a>
              {/* </Link> */}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
