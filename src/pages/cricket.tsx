import clsx from 'clsx';
import Page from '../components/Page';
import 'aos/dist/aos.css';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import LogoSm from 'src/components/icons/LogoSm';
import JoinIcon from 'src/components/icons/JoinIcon';
import ADBE from 'src/components/icons/ABDE';
import { paddingX } from 'src/utils';
import { t, Trans } from '@lingui/macro';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { additionalApiClient } from 'src/client';
import { yupResolver } from '@hookform/resolvers/yup';
import CircleCheck from 'src/components/icons/CircleCheck';
import Input from 'src/components/Input';

interface FormData {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email(t`Invalid email!`)
      .required(t`Email is required!`)
  })
  .required();

const Cricket = () => {
  const [error, setError] = useState('');
  const [success, setIsSubmitSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      setIsSubmitSuccess(false);

      await additionalApiClient
        .post(`/subscribe-cricket`, data)
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
    <Page action="join-discord" footerClassName="hidden md:block">
      <div
        className={clsx(
          headerNavSpacingClassName,
          "bg-[url('/images/cricket/background-mobile_op.png')] bg-cover md:bg-[url('/images/cricket/background_op.png')]"
        )}>
        <div className={clsx('pt-10 pb-[280px] md:pt-[160px]', paddingX)}>
          <div className="mx-auto flex max-w-content flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center space-x-9 text-light">
              <i className="w-[80px]">
                <LogoSm />
              </i>
              <i className="w-[60px]">
                <JoinIcon />
              </i>
              <i className="w-[72px]">
                <ADBE />
              </i>
            </div>
            <h1 className="mt-8 max-w-[724px] text-[44px] font-bold leading-[1.25] text-[#FFFDFD] md:mt-0 md:text-[60px]">
              <Trans>Register to win exclusive AB de Villiers NFTs</Trans>
            </h1>
            <div className="contents max-w-[631px] md:block">
              <p className="mt-10 text-[16px] leading-[1.5] md:mt-6 md:text-[22px]">
                <Trans>
                  Cricket legend AB de Villiers has joined forces with Myria to deliver the next
                  generation of blockchain gaming to cricket fans around the world
                </Trans>
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-10 w-full md:mt-8 md:w-auto">
                <div className="grid grid-cols-1 items-start gap-8 gap-y-5 sm:grid-cols-[1fr_auto]">
                  <Input
                    placeholder={t`Email address`}
                    {...register('email')}
                    error={!!errors.email || !!error}
                    errorText={errors.email?.message || error}
                    containerClassName="relative"
                    className="border-none bg-[#0B2231] placeholder:text-[#A1AFBA]"
                    message={
                      success ? (
                        <p className="absolute bottom-[-20px] flex items-center text-xs leading-[15px] text-white">
                          <CircleCheck />
                          <span className="ml-1">
                            <Trans>Thank you for subscribing!</Trans>
                          </span>
                        </p>
                      ) : null
                    }
                  />
                  <button className="btn-lg btn-primary md:min-h-[48px]" disabled={isSubmitting}>
                    <Trans>LET’S GO</Trans>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Cricket;
