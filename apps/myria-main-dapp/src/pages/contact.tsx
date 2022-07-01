import { Trans } from '@lingui/macro';
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
            className="absolute left-0 z-[-1] h-[783px] w-full">
            <div className="relative h-full w-full ">
              <Image
                src="/images/contact/header-bg_op.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mx-auto mt-[50px] max-w-[756px] text-center text-brand-white md:heading-massive md:mt-[120px]">
              <Trans>Contact us</Trans>
            </h1>
            <a href="mailto:hello@myria.com" className="mt-[35px] flex items-center justify-center">
              <span className="w-[32px]">
                <MailIcon />
              </span>
              <p className="body ml-2 text-center md:body-lg">hello@myria.com</p>
            </a>
          </div>
          <div className="mt-[126px]">
            <GetInTouch />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[83px] mb-[145px]')}>
          <h3 className="heading-sm text-center md:heading-md">
            <Trans>Connect with us</Trans>
          </h3>
          <div className="mt-[48px] grid grid-flow-col justify-center gap-4 md:gap-[69px]">
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
