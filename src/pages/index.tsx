import clsx from 'clsx';
import { headerHeight } from '../components/Header';
import JoinTheRevolution from '../components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import { paddingX } from '../utils';
import Page from '../components/Page';
import AOS from 'aos';
import { useEffect } from 'react';
import Subscribe from 'src/components/Subscribe';
import 'aos/dist/aos.css';
import { Trans } from '@lingui/macro';
import Hero from 'src/components/home/Hero';
import OurGames from 'src/components/home/OurGames';
import Program from 'src/components/Program';
import News from 'src/components/home/News';
import { bannerSpacingClassName, headerNavSpacingClassName } from 'src/components/Header/Header';

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
    <Page>
      <div className={headerNavSpacingClassName}>
      <div className={clsx(paddingX, 'md:mt-7')}>
          <div className="mx-auto max-w-content">
            <div className="-mx-6 md:mx-0">
              <Hero />
            </div>
            <div className="mt-12 md:mt-10">
              <OurGames />
            </div>
            <div className="mt-10 md:mt-11">
              <Program />
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
            className="mx-auto mt-[32px] max-w-[717px] text-center  text-lg text-light md:text-[20px] md:leading-[1.5]">
            <Trans>
              Myria has been built by an all-star team of over 100 people, united with a common
              vision of revolutionizing gaming with blockchain technology.
            </Trans>
          </p>
        </section>
        <section className={clsx(paddingX, 'mt-[50px] md:mt-[88px]')}>
          <div data-aos="fade-up" className="md:mt-[59px]">
            <ExperenceLogos />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[43px] md:mt-[103px]')}>
          <div className="mx-auto max-w-content">
            <JoinTheRevolution textAnimation="fade-up" />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[64px] mb-[156px] md:mb-[168px]')}>
          <div className="mx-auto max-w-content">
            <Subscribe />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Index;
