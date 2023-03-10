import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import Link from 'next/link';
import { useAuthenticationContext } from 'src/context/authentication';
import Button from '../core/Button';

export interface IFormSignInInput {
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
  const { forgotPassword, openVerify, loginError, isPostingRegister } = useAuthenticationContext();
  const [error, setError] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    setError(loginError);
  }, [loginError]);

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

  return (
    <div className="px-8">
      <p className="body mt-7 text-white">Sign in to your account</p>
      <form onSubmit={handleSubmit(openVerify)} noValidate>
        <div className="mb-2">
          <Input
            placeholder={t`Enter your email`}
            {...registerForm('email')}
            error={!!errors.email || !!error}
            errorText={errors.email?.message || error}
            className="mt-7"
          />
          <Input
            placeholder={t`Enter your password`}
            {...registerForm('password')}
            error={!!errors.password}
            errorText={errors.password?.message}
            className="w-full pr-9"
            containerClassName="mt-6"
            type="password"
          />
        </div>
        <a className="text-brand-gold hover:cursor-pointer" onClick={forgotPassword}>
          <Trans>Forgot your password?</Trans>
        </a>
        <Button loading={isPostingRegister} className="btn-lg btn-primary my-8 w-full">
          <Trans>Sign in</Trans>
        </Button>
        {/* <div className="mt-6 mb-8 text-center">
          <div className="text-light">
            {t`Don???t have an account?`}{' '}
            <span className="text-gold">
              <a className="text-brand-gold hover:cursor-pointer" onClick={register}>
                <Trans>Sign up now</Trans>
              </a>
            </span>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default SignIn;
