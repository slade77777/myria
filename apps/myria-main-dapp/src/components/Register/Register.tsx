import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import EyeIcon from '../icons/EyeIcon';
import CheckIcon from '../icons/CheckIcon';
import WarningIcon from '../icons/WarningIcon';
import { useAuthenticationContext } from 'src/context/authentication';
import { validatePassword } from 'src/utils';
import Button from '../core/Button';
import StrickOutEyeIcon from '../icons/StrickOutEyeIcon';

export interface IFormRegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const passwordHints = (text: string) => {
  return [
    {
      text: t`At least 8 characters—the more characters, the better`,
      validate: /^.{8,}$/.test(text)
    },
    {
      text: t`A mixture of both uppercase and lowercase letters`,
      validate: /[a-z].*[A-Z]|[A-Z].*[a-z]/.test(text)
    },
    {
      text: t`A mixture of letters and numbers`,
      validate: /\d/.test(text) && /[a-zA-Z]/g.test(text)
    },
    {
      text: t`Inclusion of at least one special character`,
      validate: !/^[a-zA-Z0-9]*$/.test(text)
    }
  ];
};

const schema = yup
  .object({
    firstName: yup.string().required(t`First name is required!`),
    lastName: yup.string().required(t`Last name is required!`),
    username: yup.string().required(t`Username is required!`),
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`),
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

const Register: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [hints, setHints] = useState(() => passwordHints(''));
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
    watch
  } = useForm<IFormRegisterInput>({
    resolver: yupResolver(schema)
  });
  const watchFields = watch(['password']);

  const { doRegister, registerError, isPostingRegister } = useAuthenticationContext();

  useEffect(() => {
    registerError?.errors.forEach(({ code, details }) => {

      if (code === "invalid_password") {
        setError("password", { type: 'custom', message: details });
        return;
      }

      if (code === "username_in_use") {
        setError("username", { type: 'custom', message: details });
        return;
      }

      if (code === "email_in_use") {
        setError("email", { type: 'custom', message: details });
        return;
      }

      if (code === "firstname_contains_profanity") {
        setError("firstName", { type: 'custom', message: 'First name contains profanity' });
        return;
      }

      if (code === "lastname_contains_profanity") {
        setError("lastName", { type: 'custom', message: 'Last name contains profanity'});
        return;
      }

      if (code === "username_contains_profanity") {
        setError("username", { type: 'custom', message: 'Username contains profanity'});
        return;
      }

      setError("firstName", { type: 'custom', message: details });
    });
  }, [registerError, setError])

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const onSubmit = (data: IFormRegisterInput) => {
    const passwordError = validatePassword(data.password);
    if (passwordError) {
      setError("password", { type: 'custom', message: passwordError })
      return;
    };

    const usernameLength = data.username.length;
    if (usernameLength < 3 || usernameLength > 16) {
      setError("username", { type: 'custom', message: t`The name must be between 3 and 16 characters long.` });
      return;
    };

    doRegister(data);
  }

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setHints(() => passwordHints(value.password || ''));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="px-8 text-white">
      <p className="body mt-7">Register for a Myria account</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-8">
          <div className="relative">
            <Input
              placeholder={t`First name`}
              {...register('firstName')}
              error={!!errors.firstName}
              errorText={errors.firstName?.message}
              className="w-full bg-input border-none"
              containerClassName={!!errors.firstName ? 'mt-4' : 'mt-6'}
            />
          </div>

          <div className="relative">
            <Input
              placeholder={t`Last name`}
              {...register('lastName')}
              error={!!errors.lastName}
              errorText={errors.lastName?.message}
              className="w-full bg-input border-none"
              containerClassName={!!errors.lastName ? 'mt-4' : 'mt-6'}
            />
          </div>
        </div>
        <div className="mb-2 mt-4">
          <div className="relative">
            <Input
              placeholder={t`Username`}
              {...register('username')}
              error={!!errors.username}
              errorText={errors.username?.message}
              className="w-full bg-input border-none"
              containerClassName={!!errors.username ? 'mt-4' : 'mt-6'}
              autoComplete="off"
            />
          </div>
          <div className="relative">
            <Input
              placeholder={t`Email`}
              {...register('email')}
              error={!!errors.email}
              errorText={errors.email?.message}
              className="w-full bg-input border-none"
              containerClassName={!!errors.email ? 'mt-4' : 'mt-6'}
              autoComplete="off"
            />
          </div>
          <div className="relative">
            <Input
              placeholder={t`Enter your password`}
              {...register('password')}
              error={!!errors.password}
              errorText={errors.password?.message}
              className="w-full pr-9 bg-input border-none"
              containerClassName={!!errors.password ? 'mt-4' : 'mt-6'}
              type={visiblePassword ? 'text' : 'password'}
            />
            <span
              className="absolute top-[17px] right-2 cursor-pointer"
              onClick={toggleVisiblePassword}>
              {visiblePassword ? <StrickOutEyeIcon /> : <EyeIcon />}
            </span>
          </div>
          <div className="relative">
            <Input
              placeholder={t`Confirm password`}
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
              className="w-full pr-9 bg-input border-none"
              containerClassName={!!errors.email ? 'mt-4 ' : 'mt-6'}
              type={visibleConfirmPassword ? 'text' : 'password'}
            />
            <span
              className="absolute top-[17px] right-2 cursor-pointer"
              onClick={toggleVisibleConfirmPassword}>
              {visibleConfirmPassword ? <StrickOutEyeIcon /> : <EyeIcon />}
            </span>
          </div>
        </div>
        {hints.map((hint) => {
          return (
            <div
              className={clsx('mt-2 flex items-center', { 'opacity-50': !hint.validate })}
              key={hint.text}>
              {hint.validate ? <CheckIcon /> : <WarningIcon />}
              <p className=" ml-[10px]">{hint.text}</p>
            </div>
          );
        })}
        <Button
          loading={isPostingRegister}
          className="btn-lg btn-primary my-8 w-full">
          <Trans>Register</Trans>
        </Button>
      </form>
    </div>
  );
};

export default Register;
