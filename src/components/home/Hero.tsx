import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React, { CSSProperties, useMemo } from 'react';
import DiscordIcon from '../icons/DiscordIcon';
import CowboyImg from 'public/images/home/cowboy-1.png';
import MonkeyImg from 'public/images/home/monkey-1.png';
import UnicornImg from 'public/images/home/unicorn-guy-1.png';
import SkyImg from 'public/images/home/sky.png';
import LandImg from 'public/images/home/land.png';
import HeaderBgMobile from 'public/images/home/header-bg-mobile.jpeg';
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
import { paddingX } from 'src/utils';
import Input from '../Input';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  // useIsomorphicLayoutEffect(() => {
  //   let animations: gsap.core.Timeline[] = [];
  //   ScrollTrigger.matchMedia({
  //     '(min-width: 1000px)': function () {
  //       const targets = [
  //         '.land-img',
  //         '.hero-text',
  //         '.cowboy-img',
  //         '.unicorn-guy-img',
  //         '.monkey-img'
  //       ];

  //       targets.forEach((target, idx) => {
  //         const tl_section = gsap.timeline({
  //           scrollTrigger: {
  //             trigger: '#hero',
  //             start: `top top`,
  //             end: 'bottom top',
  //             scrub: 0.6
  //           }
  //         });
  //         tl_section.to(target, { y: `-${50 * (idx + 2)}px` });
  //         animations.push(tl_section);
  //       });
  //     }
  //   });
  //   return () => {
  //     animations.forEach((tl) => tl.kill());
  //   };
  // }, [currentSlide]);

  const { event } = useGA4();

  const settings: Settings = useMemo(
    () => ({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'carousel-dots bottom-4 md:bottom-6',
      autoplay: true,
      autoplaySpeed: 5000,
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
              'relative isolate flex min-h-[805px] flex-col justify-end overflow-hidden bg-cover bg-center py-4 px-8 pb-[65px] md:justify-end md:px-[100px] md:pb-[162px]'
            )}>
            <video
              className="absolute inset-0 z-[-1] h-full w-full object-cover opacity-70"
              loop
              muted
              autoPlay>
              <source src="/videos/home/moonville.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-center md:max-w-[608px] md:text-left">
              <div className="w-[388px]">
                <Image src="/images/home/moonville-logo.png" width={582} height={326} alt="" />
              </div>
              <p className="mt-10 text-[18px] leading-[1.5] md:text-[22px]">
                <Trans>COMING SOON</Trans>
              </p>
              <p className="mt-5 text-[32px] font-extrabold leading-[1.15] md:text-[40px]">
                <Trans>Register for Moonville Farms early access</Trans>
              </p>
              <form className="mt-10 flex w-full space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="border-none bg-[#172630] px-6 py-3.5 text-light"
                  containerClassName="flex-grow"
                />
                <button className="btn-lg btn-primary">
                  <Trans>SUBMIT</Trans>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className="flex min-h-[805px] flex-col justify-end bg-[url('/images/home/banner-3-mobile_op.png')] bg-cover bg-center px-8 pb-[65px] md:justify-start md:bg-[url('/images/home/banner-3_op.png')] md:pt-[137px] md:pl-[107px]">
            <div className="text-center md:max-w-[539px] md:text-left">
              <div className="flex items-center space-x-4 md:space-x-[57px]">
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
                  className="btn-sm btn-primary mt-6 md:btn-lg md:mt-[45px]"
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
          <div className="flex min-h-[805px] flex-col justify-end bg-[url('/images/home/banner-1-mobile_op.png')] bg-cover px-8 pb-[65px] md:rounded-xl md:bg-[url('/images/home/banner-1_op.png')] md:pb-[91px] md:pl-[107px]">
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
