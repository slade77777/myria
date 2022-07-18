import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import { isDesktop } from 'react-device-detect';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import DiscordIcon from '../icons/DiscordIcon';
import Slider, { Settings } from 'react-slick';
import { useGA4 } from 'src/lib/ga';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import LogoSm from '../icons/LogoSm';
import JoinIcon from '../icons/JoinIcon';
import ADBE from '../icons/ABDE';
import Input from '../Input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { additionalApiClient } from 'src/client';
import CircleCheck from '../icons/CircleCheck';

gsap.registerPlugin(ScrollTrigger);

interface IFormInputs {
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

const Hero: React.FC = () => {
  const { event } = useGA4();

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
    console.log(data);
    try {
      setError('');
      setIsSubmitSuccess(false);

      await additionalApiClient
        .post(`/subscribe-moonville`, data)
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

  const settings: Settings = useMemo(
    () => ({
      arrows: false,
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'carousel-dots bottom-4 md:bottom-6',
      autoplay: true,
      autoplaySpeed: 30000,
      pauseOnHover: true
    }),
    []
  );

  return (
    <div className="relative">
      <Slider {...settings}>
        <div>
          <div
            className={clsx(
              'relative isolate flex min-h-[615px] flex-col justify-end overflow-hidden bg-cover bg-center py-4 px-8 pb-[65px] md:min-h-[805px] md:justify-end md:px-[100px] md:pb-[162px]'
            )}>
            {isDesktop && (
              <video
                className="absolute inset-0 z-[-1] hidden h-full w-full object-cover opacity-70 md:block"
                loop
                muted
                autoPlay>
                <source src="/videos/home/moonville.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <img
              src="/images/home/moonville-banner-mobile.jpeg"
              className="absolute inset-0 z-[-1] h-full w-full object-cover opacity-70 md:!hidden "
              alt=""
            />
            <div className="text-center md:max-w-[608px] md:text-left">
              <div className="mx-auto max-w-[388px] md:mx-0">
                <Image src="/images/home/moonville-logo.png" width={582} height={326} alt="" />
              </div>
              <p className="mt-10 text-[18px] leading-[1.5] md:text-[22px]">
                <Trans>COMING SOON</Trans>
              </p>
              <p className="mt-5 text-[32px] font-extrabold leading-[1.15] md:text-[40px]">
                <Trans>Register for Moonville Farms early access</Trans>
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-10 flex w-full items-start space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="border-none bg-[#172630] px-6 py-3.5 text-light"
                  containerClassName="flex-grow relative"
                  {...register('email')}
                  error={!!errors.email || !!error}
                  errorText={errors.email?.message || error}
                  message={
                    success && !errors.email ? (
                      <p className="absolute bottom-[-20px] flex items-center text-xs leading-[15px] text-white">
                        <CircleCheck />
                        <span className="ml-1">
                          <Trans>Thank you for subscribing!</Trans>
                        </span>
                      </p>
                    ) : null
                  }
                />
                <button
                  type="submit"
                  className="btn-lg btn-primary h-[52px]"
                  disabled={isSubmitting}>
                  <Trans>SUBMIT</Trans>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className="flex min-h-[615px] flex-col justify-end bg-[url('/images/home/banner-3-mobile_op.png')] bg-cover bg-center px-8 pb-[65px] md:min-h-[805px] md:justify-start md:bg-[url('/images/home/banner-3_op.png')] md:pt-[137px] md:pl-[107px]">
            <div className="text-center md:max-w-[539px] md:text-left">
              <div className="flex items-center justify-center space-x-4 md:justify-start md:space-x-[57px]">
                <i className="w-[108px]">
                  <LogoSm />
                </i>
                <i className="w-[52px] text-light">
                  <JoinIcon />
                </i>
                <i className="w-[174px]">
                  <ADBE />
                </i>
              </div>
              <p className="mt-10 text-[18px] leading-[1.5] md:text-[22px] ">
                <Trans>
                  Cricket legend AB de Villiers has joined forces with Myria to deliver the next
                  generation of blockchain gaming to cricket fans around the world
                </Trans>
              </p>
              <Link href="/cricket">
                <a
                  className="btn-lg btn-primary mt-6 md:mt-[45px]"
                  onClick={() => {
                    event('Hero Banner Clicked', { campaign: 'AB de Villers' });
                  }}>
                  <Trans>LEARN MORE</Trans>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex min-h-[615px] flex-col justify-end bg-[url('/images/home/banner-1-mobile_op.png')] bg-cover px-8 pb-[65px] md:min-h-[805px] md:rounded-xl md:bg-[url('/images/home/banner-1_op.png')] md:pb-[91px] md:pl-[107px]">
            <div className="text-center md:max-w-[539px] md:text-left">
              <p className="text-[28px] font-black leading-[1.15] text-[#93F6FF]">
                <Trans>COMING SOON</Trans>
              </p>
              <p className="mt-5 text-[40px] font-extrabold leading-[1.15] md:mt-4 md:text-[60px]">
                <Trans>$MYRIA Token</Trans>
              </p>
              <button className="btn-sm btn-primary mt-6 md:mt-6 md:py-[9px]">
                <i className="mr-2.5 w-[30px]">
                  <DiscordIcon />
                </i>
                <Trans>STAY TUNED ON DISCORD</Trans>
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
