import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import { useAuthenticationContext } from 'src/context/authentication';

export interface IFormForgotPasswordInput {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
  })
  .required();

const ForgotPassword: React.FC = () => {
  const { login, doForgotPassword, forgotPasswordError } = useAuthenticationContext();
  const [error, setError] = useState('');

  useEffect(() => { setError(forgotPasswordError) }, [forgotPasswordError])

  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormForgotPasswordInput>({
    resolver: yupResolver(schema)
  });

  return (
    <div className="px-8">
      <p className="body mt-7 text-white">Enter your email address to reset your password</p>
      <form onSubmit={handleSubmit(doForgotPassword)} noValidate>
        <div className="mb-2">
          <Input
            placeholder={t`Enter your email`}
            {...registerForm('email')}
            error={!!errors.email || !!error}
            errorText={errors.email?.message || error}
            className="mt-7"
          />
        </div>
        <button className="btn-lg btn-primary mt-8 w-full">
          <Trans>Reset Password</Trans>
        </button>
        <div className="mt-6 mb-8 text-center">
          <div className="text-light">
            {t`Already have an account?`}{' '}
            <span className="text-gold">
              {/* <Link href="/" passHref> */}
              <a className="text-brand-gold hover:cursor-pointer" onClick={login}>
                <Trans>Log in</Trans>
              </a>
              {/* </Link> */}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
