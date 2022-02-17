import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React, { CSSProperties } from 'react';
import { socialLinks } from 'src/configs';
import { paddingX } from 'src/utils';
import { headerHeight } from '../Header';
import DiscordIcon from '../icons/DiscordIcon';
import CowboyImg from 'public/images/home/cowboy-1.png';
import MonkeyImg from 'public/images/home/monkey-1.png';
import UnicornImg from 'public/images/home/unicorn-guy-1.png';
import SkyImg from 'public/images/home/sky.png';
// import CloudImg from 'public/images/home/cloud.png';
import LandImg from 'public/images/home/land.png';
import HeaderBgMobile from 'public/images/home/header-bg-mobile.png';
import HeaderBgOverlayMobile from 'public/images/home/header-bg-overlay-mobile.png';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_WIDTH = 1000;

const Hero: React.FC = () => {
  useIsomorphicLayoutEffect(() => {
    if (window.innerWidth < DESKTOP_WIDTH) {
      return;
    }

    const targets = ['.land-img', '.hero-text', '.cowboy-img', '.unicorn-guy-img', '.monkey-img'];

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
    });
  }, []);

  return (
    <div
      id="hero"
      style={
        {
          borderTopWidth: headerHeight,
          '--minHeight': `${headerHeight + 750}px`
        } as CSSProperties
      }
      className={clsx(
        paddingX,
        'relative isolate flex min-h-[var(--minHeight)] flex-col justify-end overflow-hidden border-transparent md:justify-center'
      )}>
      <div className="absolute inset-0 z-[-1] hidden md:block">
        {/* <Image src="" /> */}
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
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            {/* <Image src={CloudImg} alt="" placeholder="blur" layout="fill" objectFit="cover" /> */}
          </div>
        </div>
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
        <div className="absolute left-0 bottom-0 h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={HeaderBgOverlayMobile}
              alt=""
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-content">
        <div className="hero-text my-[50px] max-w-[607px] text-center md:mt-0 md:text-left">
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            className="heading-lg text-brand-white md:heading-massive">
            <Trans>
              Connecting the world through{' '}
              <span className=" aos-text-slide-right text-brand-gold [--animated-color:#F5B941]">
                play
              </span>
            </Trans>
          </h1>
          <h3
            data-aos="fade-up"
            data-aos-duration="2000"
            className="heading-sm-mobile mt-6 md:heading-sm md:mt-[32px]">
            <span className="aos-text-slide-right text-white ![animation-delay:0.5s] [--current-color:#97AAB5] [--animated-color:white]">
              <Trans>Myria is a blockchain gaming ecosystem powered by the Myria blockchain.</Trans>
            </span>
          </h3>
          <a
            data-aos="fade-up"
            data-aos-duration="3000"
            href={socialLinks.discord}
            target="_blank"
            className="btn-icon btn-primary mx-auto mt-[38px] inline-flex items-center"
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
  );
};

export default Hero;
