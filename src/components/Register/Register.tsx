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
      validate: /^(?=.*\d).{8,}$/.test(text)
    },
    {
      text: t`A mixture of both uppercase and lowercase letters`,
      validate: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(text)
    },
    {
      text: t`A mixture of letters and numbers`,
      validate: /\d/.test(text) && /[a-zA-Z]/g.test(text)
    },
    {
      text: t`Inclusion of at least one special character`,
      validate: !/^[a-zA-Z0-9 ]*$/.test(text)
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

  const { doRegister, registerError } = useAuthenticationContext();

  useEffect(() => {
    registerError?.errors.forEach(({ code, detail }) => {
      if (code === "user_exists") {
        setError("username", { type: 'custom', message: detail })
        return
      }

      if (code === "email_exists") {
        setError("email", { type: 'custom', message: detail })
        return
      }

      setError("firstName", { type: 'custom', message: detail })
    })
  }, [registerError, setError])

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setHints(() => passwordHints(value.password || ''));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="px-8 text-white">
      <p className="body mt-7">Register for a Myria account</p>
      <form onSubmit={handleSubmit(doRegister)} noValidate>
        <div className="mb-2 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-8">
          <Input
            placeholder={t`First name`}
            {...register('firstName')}
            error={!!errors.firstName}
            errorText={errors.firstName?.message}
            className={!!errors.firstName ? 'mt-4' : 'mt-6'}
          />
          <Input
            placeholder={t`Last name`}
            {...register('lastName')}
            error={!!errors.lastName}
            errorText={errors.lastName?.message}
            className={!!errors.lastName ? 'mt-4' : 'mt-6'}
          />
        </div>
        <div className="mb-2 mt-4">
          <Input
            placeholder={t`Username`}
            {...register('username')}
            error={!!errors.username}
            errorText={errors.username?.message}
            className={!!errors.username ? 'mt-4' : 'mt-6'}
          />
          <Input
            placeholder={t`Email`}
            {...register('email')}
            error={!!errors.email}
            errorText={errors.email?.message}
            className={!!errors.email ? 'mt-4' : 'mt-6'}
          />
          <div className="relative">
            <Input
              placeholder={t`Enter your password`}
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
              containerClassName={!!errors.email ? 'mt-4' : 'mt-6'}
              type={visibleConfirmPassword ? 'text' : 'password'}
            />
            <span
              className="absolute top-[17px] right-2 cursor-pointer"
              onClick={toggleVisibleConfirmPassword}>
              <EyeIcon />
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
        <button className="btn-lg btn-primary my-8 w-full">
          <Trans>Register</Trans>
        </button>
      </form>
    </div>
  );
};

export default Register;
