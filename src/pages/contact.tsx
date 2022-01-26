import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Socials from 'src/components/Social';
import GetInTouch from '../components/GetInTouch';
import { headerHeight } from '../components/Header';
import MailIcon from '../components/icons/MailIcon';
import Page from '../components/Page';
import { paddingX } from '../utils';

const Contact: React.FC = () => {
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen ')}>
          <div
            style={{
              top: headerHeight
            }}
            className="absolute left-0 h-[783px] w-full z-[-1]">
            <div className="relative w-full h-full ">
              <Image src="/images/contact/header-bg.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
              Contact us
            </h1>
            <a href="mailto:hello@myria.com" className="flex items-center justify-center mt-[35px]">
              <span className="w-[32px]">
                <MailIcon />
              </span>
              <p className="ml-2 text-center body md:body-lg">hello@myria.com</p>
            </a>
          </div>
          <div className="mt-[126px]">
            <GetInTouch />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[83px] mb-[145px]')}>
          <h3 className="text-center heading-sm md:heading-md">Connect with us</h3>
          <div className="mt-[48px] grid grid-flow-col gap-4 md:gap-[69px] justify-center">
            {Socials.map((s) => (
              <a
                href={s.link}
                className="w-[32px] md:w-[40px]"
                key={s.link}
                target="_blank"
                rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Contact;
