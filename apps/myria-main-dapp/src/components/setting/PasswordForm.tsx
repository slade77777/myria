import { memo } from 'react';
import * as yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { validatePassword } from '../../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import clsx from 'clsx';
import { Loading } from '../Loading';

yup.addMethod(yup.string, 'validatePassword', function (errorMessage) {
  return this.test(`test-card-type`, '', function (value) {
    const { path, createError } = this;

    if (!value) {
      return createError({ path, message: errorMessage });
    }

    const result = validatePassword(value);

    if (!result) {
      return true;
    } else {
      return createError({ path, message: result });
    }
  });
});

const schema = yup
  .object({
    newPassword: yup
      .string()
      //@ts-ignore
      .validatePassword(),
    confirmPassword: yup
      .string()
      //@ts-ignore
      .validatePassword()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password must match!')
  })
  .required();

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const isLoading = false;
  const canUpdate = isValid;

  return (
    <div className="pl-6 pt-2">
      <p className="text-base/9 mb-2">New Password</p>
      <Input
        placeholder={t`Password`}
        {...register('newPassword')}
        error={!!errors.newPassword}
        errorText={errors.newPassword?.message}
        containerClassName="relative"
      />
      <p className="text-base/9 mb-2 mt-6">Re-Enter Password</p>
      <Input
        placeholder={t`Confirm Password`}
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        errorText={errors.confirmPassword?.message}
        containerClassName="relative"
      />
      <button
        className={clsx('btn-lg mt-4 w-56', canUpdate ? 'cursor-pointer btn-primary' : 'bg-gray/4')}
        onClick={canUpdate ? handleSubmit(() => {}) : undefined}>
        {isLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <Trans>SAVE CHANGES</Trans>
        )}
      </button>
    </div>
  );
};

export default memo(PasswordForm);
