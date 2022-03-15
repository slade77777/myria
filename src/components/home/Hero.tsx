import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React, { CSSProperties } from 'react';
import { socialLinks } from 'src/configs';
import DiscordIcon from '../icons/DiscordIcon';
import CowboyImg from 'public/images/home/cowboy-1.png';
import MonkeyImg from 'public/images/home/monkey-1.png';
import UnicornImg from 'public/images/home/unicorn-guy-1.png';
import SkyImg from 'public/images/home/sky.png';
import LandImg from 'public/images/home/land.png';
import HeaderBgMobile from 'public/images/home/header-bg-mobile.png';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  useIsomorphicLayoutEffect(() => {
    let animations: gsap.core.Timeline[] = [];
    ScrollTrigger.matchMedia({
      '(min-width: 1000px)': function () {
        const targets = [
          '.land-img',
          '.hero-text',
          '.cowboy-img',
          '.unicorn-guy-img',
          '.monkey-img'
        ];

        targets.forEach((target, idx) => {
          const tl_section = gsap.timeline({
            scrollTrigger: {
              trigger: '#hero',
              start: `top top`,
              end: 'bottom top',
              scrub: 0.6
            }
          });
          tl_section.to(target, { y: `-${50 * (idx + 2)}px` });
          animations.push(tl_section);
        });
      }
    });
    return () => {
      animations.forEach((tl) => tl.kill());
    };
  }, []);

  return (
    <div
      id="hero"
      className={clsx(
        'relative isolate flex min-h-[615px] flex-col justify-end overflow-hidden border-transparent md:justify-center md:rounded-xl'
      )}>
      <div className="absolute inset-0 z-[-1] hidden md:block">
        <div className="sky-img absolute inset-0">
          <div className="relative h-full w-full">
            <Image src={SkyImg} alt="" placeholder="blur" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="land-img absolute left-0 bottom-[-100px] h-full w-full">
          <div className="relative h-full w-full">
            <Image src={LandImg} alt="" placeholder="blur" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 h-full w-full max-w-[1440px] -translate-x-1/2 -translate-y-1/2">
          <div className="unicorn-guy-img absolute inset-0">
            <div className="relative h-full w-full">
              <Image src={UnicornImg} alt="" placeholder="blur" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="monkey-img absolute inset-0">
            <div className="relative h-full w-full">
              <Image src={MonkeyImg} alt="" placeholder="blur" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="cowboy-img absolute inset-0">
            <div className="relative h-full w-full">
              <Image src={CowboyImg} alt="" placeholder="blur" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
        <div
          style={
            {
              background:
                'linear-gradient(89.66deg, rgba(5, 14, 21, 0.54) 1.52%, rgba(0, 0, 0, 0) 60.23%)'
            } as CSSProperties
          }
          className="absolute inset-0"></div>
        <div className="absolute inset-0">
          {new Array(3).fill(null).map((_, idx) => (
            <img
              key={idx}
              src={`/images/home/cloud${idx}.png`}
              alt=""
              style={{ '--index': idx + 1 } as CSSProperties}
              className=" absolute -bottom-[120px] left-0 w-full animate-cloud"
            />
          ))}
          {new Array(3).fill(null).map((_, idx) => (
            <img
              key={idx + 5}
              src={`/images/home/cloud${idx}.png`}
              alt=""
              style={{ '--index': 10 - idx } as CSSProperties}
              className=" absolute -bottom-[120px] left-0 w-full animate-cloud"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-[-1] md:hidden">
        <div className="absolute left-0 bottom-0 h-full w-full">
          <div className="relative h-full w-full">
            <Image src={HeaderBgMobile} alt="" placeholder="blur" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
      <div
        style={
          {
            '--bg': 'linear-gradient(360deg, rgba(5, 14, 21, 0.5) 52.64%, rgba(5, 14, 21, 0) 100%)'
          } as any
        }
        className="mx-auto w-full max-w-content px-6  [background:var(--bg)] md:bg-none md:px-[64px]">
        <div className="hero-text my-[50px] max-w-[607px] text-center md:mt-0 md:text-left">
          <h1 data-aos="fade-up" data-aos-duration="1000" className="heading-lg text-brand-white">
            <Trans>
              Bringing{' '}
              <span className=" aos-text-slide-right text-brand-gold [--animated-color:#F5B941]">
                blockchain gaming{' '}
              </span>
              to the world
            </Trans>
          </h1>
          <h3
            data-aos="fade-up"
            data-aos-duration="2000"
            className="mt-6 text-[18px] leading-[1.3] md:text-[22px]">
            <span className="aos-text-slide-right text-white ![animation-delay:0.5s] [--current-color:#97AAB5] [--animated-color:white]">
              <Trans>
                A decentralised Ethereum scaling platform, purpose built for digital assets and
                gaming.
              </Trans>
            </span>
          </h3>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="mt-8 flex justify-center space-x-5 md:justify-start">
            <a className="btn-lg btn-white">
              <Trans>Learn more</Trans>
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              className="btn-icon btn-primary inline-flex items-center"
              rel="noreferrer">
              <span className="w-[30px]">
                <DiscordIcon />
              </span>
              <span>
                <Trans>JOIN DISCORD</Trans>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
