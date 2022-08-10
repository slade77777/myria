import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import { useAuthenticationContext } from 'src/context/authentication';
import EyeIcon from '../icons/EyeIcon';
import { validatePassword } from 'src/utils';

export interface IFormResetPasswordInput {
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .trim()
      .required(t`Password is required!`),
    confirmPassword: yup
      .string()
      .trim()
      .required(t`Confirm password is required!`)
      .oneOf([yup.ref('password'), null], 'Confirm password must match!')
  })
  .required();

const ResetPassword: React.FC = () => {
  const { doResetPassword, resetPasswordError } = useAuthenticationContext();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormResetPasswordInput>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setError('password', { type: 'custom', message: resetPasswordError });
  }, [resetPasswordError, setError]);

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const onSubmit = (data: IFormResetPasswordInput) => {
    const passwordError = validatePassword(data.password);
    setError('password', { type: 'custom', message: passwordError });
    if (!passwordError) {
      doResetPassword(data);
    }
  };

  return (
    <div className="px-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative">
          <Input
            placeholder={t`Enter a password`}
            {...register('password')}
            error={!!errors.password}
            errorText={errors.password?.message}
            className="w-full pr-9"
            containerClassName={!!errors.password ? 'mt-4' : 'mt-6'}
            type={visiblePassword ? 'text' : 'password'}
          />
          <span
            className="absolute top-[17px] right-2 cursor-pointer"
            onClick={toggleVisiblePassword}>
            <EyeIcon />
          </span>
        </div>
        <div className="relative">
          <Input
            placeholder={t`Confirm password`}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
            className="w-full pr-9"
            containerClassName={!!errors.confirmPassword ? 'mt-4' : 'mt-6'}
            type={visibleConfirmPassword ? 'text' : 'password'}
          />
          <span
            className="absolute top-[17px] right-2 cursor-pointer"
            onClick={toggleVisibleConfirmPassword}>
            <EyeIcon />
          </span>
        </div>
        <button className="btn-lg btn-primary my-8 w-full">
          <Trans>Reset Password</Trans>
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
