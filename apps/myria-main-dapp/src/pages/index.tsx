import clsx from 'clsx';
import JoinTheRevolution from '../components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import { negativeMarginXMd, negativeMarginXSm, negativeMarginXXl, paddingX } from '../utils';
import Page from '../components/Page';
import AOS from 'aos';
import { useEffect } from 'react';
import Subscribe from 'src/components/Subscribe';
import { Trans } from '@lingui/macro';
import Hero from 'src/components/home/Hero';
import OurGames from 'src/components/home/OurGames';
import Program from 'src/components/Program';
import News from 'src/components/home/News';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import Link from 'next/link';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: function () {
        const maxWidth = 768;
        return window.innerWidth < maxWidth;
      }
    });
  }, []);

  return (
    <Page action="start-building">
      <div className={headerNavSpacingClassName}>
        <div>
          <Hero />
        </div>
        <div className={clsx(paddingX)}>
          <div className="max-w-content mx-auto">
            <div className="mx-auto mt-12 max-w-[1155px] md:mt-20">
              <OurGames />
            </div>
            <div className="mt-10 md:mt-[95px]">
              <Program />
            </div>
            <div className="mt-10 md:mt-11">
              <div className="max-w-content shadow-dark-panel mx-auto rounded-xl bg-[url('/images/home/network-mobile_op.png')] bg-cover bg-right-bottom p-8 pb-[300px] md:bg-[url('/images/home/network_op.png')] md:px-[64px] md:pt-[73px] md:pb-[81px]">
                <div className="md:max-w-[422px]">
                  <p className="text-brand-gold text-[20px] leading-[1.25]">
                    Scale with confidence with Myria
                  </p>
                  <p className="mt-4 text-[24px] font-bold leading-[1.25] md:text-[28px]">
                    A trusted Ethereum L2 solution, engineered for growth and security
                  </p>
                  <Link href={'/for-developers/solution'}>
                    <a href="#" className="btn-lg btn-white mt-10">
                      Learn more
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-10 md:mt-[60px]">
              <News />
            </div>
          </div>
        </div>
        <section className={clsx(paddingX, 'mt-[123px] flex-col md:mt-[88px] md:flex')}>
          <h1
            data-aos="fade-up"
            className="mx-auto mt-6 max-w-[1024px] text-center text-[32px] font-extrabold leading-10 md:text-[48px] md:leading-[1.15]">
            <Trans>Founded by leading gaming and blockchain industry veterans</Trans>
          </h1>
          <p
            data-aos="fade-up"
            className="text-light mx-auto mt-[32px] max-w-[717px]  text-center text-lg md:text-[20px] md:leading-[1.5]">
            <Trans>
              Myria has been built by an all-star team of over 150 people, united with a common
              vision of revolutionizing gaming with blockchain technology.
            </Trans>
          </p>
        </section>
        <section className={clsx(paddingX, 'mt-[50px] md:mt-[88px]')}>
          <div data-aos="fade-up" className="max-w-content mx-auto md:mt-[59px]">
            <ExperenceLogos />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[43px] md:mt-[103px]')}>
          <div className="max-w-content mx-auto">
            <JoinTheRevolution textAnimation="fade-up" />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[64px] mb-[156px] md:mb-[168px]')}>
          <div className="max-w-content mx-auto">
            <Subscribe />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Index;
