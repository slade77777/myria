import clsx from 'clsx';
import { isDesktop } from 'react-device-detect';
import * as React from 'react';
import { headerHeight } from 'src/components/Header';
import ArrowRightAltIcon from 'src/components/icons/ArrowRightAltIcon';
import Page from 'src/components/Page';
import { paddingX } from 'src/utils';
import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PlayIcon from 'src/components/icons/PlayIcon';
import Aos from 'aos';
import ReactPlayer from 'react-player';
import CloseIcon from 'src/components/icons/CloseIcon';
import { socialLinks } from 'src/configs';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Careers: React.FC = () => {
  const [openVideo, setOpenVideo] = React.useState(false);
  const arrow1 = React.useRef<HTMLSpanElement>(null);
  const arrow2 = React.useRef<HTMLSpanElement>(null);
  const arrows = [arrow1, arrow2];
  const handleOpenVideo = () => {
    setOpenVideo(true);
  };

  useIsomorphicLayoutEffect(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.video-section',
            start: 'bottom bottom',
            endTrigger: '.video-description',
            end: 'top top',
            pin: true,
            pinType: 'fixed',
            pinSpacing: false
          }
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: '.video-placeholder',
            start: 'top bottom',
            endTrigger: '.video-description',
            end: 'top top',
            pin: true
          }
        });
        ScrollTrigger.create({
          trigger: '.video-description',
          start: 'top center',
          end: 'bottom top',
          toggleClass: {
            className: '!opacity-100',
            targets: '.video-play'
          }
        });
      }
    });
  }, []);

  React.useEffect(() => {
    Aos.init({
      duration: 1000,
      disable: function () {
        const maxWidth = 768;
        return window.innerWidth < maxWidth;
      }
    });
  }, []);

  return (
    <Page>
      {openVideo && (
        <div
          className={clsx(
            'fixed bottom-0 top-0 z-[20] w-full bg-black bg-opacity-70 py-10 backdrop-blur-lg'
          )}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={'/videos/careers/section.mp4'}
            playing={openVideo}
            controls
            volume={1}
          />
          <button className="absolute top-4 right-4 z-[1] flex h-[50px] w-[50px] items-center justify-center bg-brand-gold">
            <span className="w-[32px] text-white" onClick={() => setOpenVideo(false)}>
              <CloseIcon />
            </span>
          </button>
        </div>
      )}
      <div
        style={
          {
            paddingTop: headerHeight,
            '--screen-height': `calc(100vh - ${headerHeight}px)`,
            '--screen-height-mobile': `calc(100vh - 104px)`
          } as React.CSSProperties
        }
        className="[--min-h-screen:var(--screen-height-mobile)] md:[--min-h-screen:var(--screen-height)]">
        <section
          className={clsx(
            paddingX,
            'flex flex-col items-center justify-center pt-4 pb-[120px] text-center min-h-[var(--min-h-screen)]'
          )}>
          {/* eslint-disable-next-line */}

          <video
            width="300"
            height="300"
            loop
            muted
            autoPlay
            webkit-playsinline
            playsInline
            src="/videos/careers/neon_good.mp4"
            id="video1"
            >
            Your browser does not support the video tag.
          </video>
          <h1 className="mt-8 text-[36px] font-bold leading-[1.25] md:text-[48px]">
            At Myria, we make magic happen.
          </h1>
          <Link href="/jobs">
            <a className="btn-lg btn-primary mt-10">SEE ALL OPEN POSITIONS</a>
          </Link>
        </section>
        <section
          className={clsx(
            paddingX,
            'flex min-h-[var(--min-h-screen)] items-center justify-center bg-brand-light-blue py-[100px]'
          )}>
          <p
            data-aos="fade-up"
            className="max-w-[1060px] text-center text-[32px] font-bold leading-[1.25] text-dark md:text-[40px]">
            Become part of a collaborative environment that values diversity, innovation, and growth
            while providing you with the resources you need to succeed. Join a team, inspire their
            work and make an impact.
          </p>
        </section>
        <section className={clsx(paddingX)}>
          <div className="mx-auto flex max-w-[919px] flex-col items-center justify-center py-[140px] text-center">
            <p
              data-aos="fade-up"
              className="text-center text-[20px] font-bold leading-[1.25] text-white md:text-[32px]">
              Work at Myria
            </p>
            <p
              data-aos="fade-up"
              className="mt-8 text-[36px] font-bold leading-[1.25] text-brand-light-blue md:text-[48px]">
              Say hello to the future of work
            </p>
            <p data-aos="fade-up" className="mt-11 text-[16px] leading-[1.25] md:text-[20px]">
              Discover the new way of working with Myria. We empower our team to collaborate,
              inspire and thrive anywhere, any time.
            </p>
          </div>
        </section>
        <section className="video-section relative isolate hidden min-h-[var(--min-h-screen)] p-4 py-[140px] text-center md:block">
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            {isDesktop && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                loop
                muted
                autoPlay
                webkit-playsinline
                playsInline>
                <source src="/videos/careers/section.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute inset-0 z-10 bg-black opacity-60" />
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            'relative z-[1] bg-[url("/images/careers/video-bg.jpg")] bg-cover md:mt-[-100px] md:bg-none'
          )}>
          <div className="absolute inset-0 z-[-1] bg-black bg-opacity-60 md:hidden" />
          <div className="mx-auto grid min-h-[var(--min-h-screen)] max-w-content content-center items-center py-10 md:min-h-0 md:grid-cols-2 md:content-between md:py-4">
            <div>
              <div className="video-description">
                <p className="text-[32px] leading-[1.25] md:text-[40px]">
                  “I chose Myria because I was inspired by the world changing impact we will be
                  bringing.”
                </p>
                <p className="mt-9 text-[16px] leading-[1.25] md:text-[20px]">Fran Tavano</p>
                <p className="mt-4 text-[16px] leading-[1.25] md:text-[20px]">
                  Product Manager, Torino
                </p>
              </div>
            </div>
            <button
              className="mt-10 flex items-center space-x-1 hover:underline md:hidden"
              onClick={handleOpenVideo}>
              <i className="w-4">
                <PlayIcon />
              </i>
              <p className="text-[20px] leading-[1.25]">Watch the video</p>
            </button>
            <button
              onClick={handleOpenVideo}
              className="video-play [&:not(.\!opacity-100)]:invisible fixed top-1/2 left-3/4 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center space-x-1 opacity-0 transition-all duration-150 hover:underline">
              <i className="w-4">
                <PlayIcon />
              </i>
              <p className="text-[20px] leading-[1.25]">Watch the video</p>
            </button>
          </div>
          <div className="video-placeholder h-[1px]" />
        </section>
        <section className={clsx(paddingX, 'mt-[100px]')}>
          <div className="mx-auto max-w-content">
            <h2 className="text-center text-[32px] font-bold leading-[1.25] md:text-[40px]">
              Join Myria, excel from anywhere
            </h2>
            <div className="mt-[56px] grid md:grid-cols-[62fr_38fr]">
              <div className="bg-brand-light-blue p-6 text-black md:p-[55px] md:py-[100px]">
                <p className="text-[32px] font-bold leading-[1.25] md:text-[40px]">
                  Join the team in building the next gaming evolution
                </p>
                <Link href="/jobs">
                  <a className="mt-6 block text-[16px] leading-[1.25] hover:underline md:text-[20px]">
                    See all opening positions
                  </a>
                </Link>
              </div>
              <div className="order-[-1] md:order-1">
                <img
                  src="/images/careers/bottom-image.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[76px] mb-[139px]')}>
          <div className="mx-auto grid max-w-content gap-y-4 gap-x-[68px] md:grid-cols-2">
            {[
              {
                title: 'Join our Community',
                link: socialLinks.discord
              },
              {
                title: 'Connect on LinkedIn',
                link: socialLinks.linkedin
              }
            ].map((item, idx) => (
              <a
                href={item.link}
                target="_blank"
                key={item.title}
                onMouseEnter={() => {
                  if (!arrows[idx].current?.classList.contains('transition-all')) {
                    arrows[idx].current?.classList.add('transition-all', '!left-0', 'duration-700');
                    setTimeout(() => {
                      arrows[idx].current?.classList.remove(
                        'transition-all',
                        '!left-0',
                        'duration-700'
                      );
                    }, 700);
                  }
                }}
                className="grid grid-cols-2 items-center border-b border-current pb-6 text-white hover:text-gray-400"
                rel="noreferrer noopenner">
                <p className="text-[20px] font-bold leading-[1.25] md:text-[40px]">{item.title}</p>
                <div className="flex justify-end">
                  <i className="relative h-[27px] w-[27px] overflow-hidden">
                    <span
                      ref={arrows[idx]}
                      className="absolute top-0 -left-[200%] flex items-center space-x-[27px]">
                      <ArrowRightAltIcon width={27} />
                      <ArrowRightAltIcon width={27} />
                    </span>
                  </i>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Careers;
