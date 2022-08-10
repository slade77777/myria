import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import ContactSalesTeamModal from 'src/components/ContactSalesTeamModal';
import Ethereum from 'src/components/for-developers/Ethereum';
import Myria from 'src/components/for-developers/Myria';
import { bannerHeight, bannerSpacingClassName } from 'src/components/Header/Header';
import Page from 'src/components/Page';
import Input from 'src/components/Input';
import { paddingX } from 'src/utils';
import DiscordGameIcon from 'src/packages/l2-wallet/src/components/Icons/DiscordGameIcon';
import { socialLinks } from '../../configs';

// import { useGA4 } from '../lib/ga';
import { useGA4 } from 'src/lib/ga';
import NewsLetter from '../newsletter';

const listId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

const ForDevelopers: React.FC = () => {
  const [showContactSalesTeamModal, setShowFirstTimeVisitModal] = useState(false);
  const [email, setEmail] = useState<string>('');
  const { event } = useGA4();

  const handleCloseContactSalesTeamModal = () => {
    setShowFirstTimeVisitModal(false);
  };

  const emailsubmit = async () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (regex.test(email)) {
      try {
        const options = {
          method: 'POST',
          headers: { Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            data: `{"token": "${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}","properties": {"$email":"${email}"}}`
          })
        };
        await axios.post('https://a.klaviyo.com/api/identify', options);
      } catch (err) {
        console.error(err);
      }
      setEmail('');
      event('Email Subscribed', { campaign: 'B2B', user_email: email });
    }
  };

  return (
    <Page action="start-building">
      <div className={bannerSpacingClassName}>
        <section
          className={clsx(
            paddingX,
            "relative isolate flex min-h-[520px] flex-col items-center bg-[url('/images/for-developers/header-bg-mobile_op.png')] bg-cover bg-top pt-[150px] pb-[87px] md:bg-none md:pt-[150px] lg:pt-[200px]"
          )}>
          <div className="hidden md:block">
            <div
              style={{
                background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
              }}
              className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
            <div className="absolute top-0 left-0 z-[-1] w-full">
              <Image
                src="/images/for-developers/header-bg_op.png"
                alt=""
                width={4320}
                height={2346}
                layout="responsive"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[668px] text-center">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              <Trans>Enabling digital asset scalability on Ethereum</Trans>
            </h1>
            <p className="mt-6 text-[18px] leading-[1.5] md:text-[20px]">
              <Trans>
                Myria is a decentralised Ethereum Layer 2, built to scale digital assets, NFTs and
                blockchain gaming.
              </Trans>
            </p>
            <div className="space-x-6">
              <Link href="http://docs.myria.com/">
                <a
                  className="btn-lg btn-primary mt-8"
                  onClick={() => {
                    event('B2B Start Building Selected', {
                      campaign: 'B2B'
                    });
                  }}>
                  <Trans>START BUILDING</Trans>
                </a>
              </Link>
              <button
                onClick={() => {
                  setShowFirstTimeVisitModal(true);
                  event('B2B Contact Sales Selected', {
                    campaign: 'B2B'
                  });
                }}>
                <a className="btn-lg border-base/9 border">
                  <Trans>CONTACT SALES</Trans>
                </a>
              </button>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-14 md:mt-10')}>
          <div className="max-w-content mx-auto">
            <Ethereum />
          </div>
        </section>
        <div
          style={
            {
              '--bg':
                'linear-gradient(180deg, #050E15 -1.93%, #041825 15.28%, #041723 80.47%, #050E15 98.21%)',
              backgroundSize: '100% 1911px'
            } as any
          }
          className={clsx(
            'mt-[95px] mb-[120px] bg-no-repeat md:mt-[170px] md:mb-[152px] md:[background-image:var(--bg)]'
          )}>
          <section
            style={
              {
                '--bg':
                  'linear-gradient(179.98deg, #050E15 0.01%, #041825 3.82%, #041723 93.84%, #050E15 99.99%)'
              } as any
            }
            className={clsx(
              paddingX,
              'mx-auto max-w-[966px] bg-bottom bg-no-repeat [background-size:100%_calc(100%-238px)] [background-image:var(--bg)] md:bg-none'
            )}>
            <Myria />
          </section>
          <section className="mx-auto max-w-[1440px] px-[88px] pt-[200px] pb-[160px]">
            <div className="flex space-x-6">
              <div className="w-[620px] rounded-[20px] bg-[#081825] p-[48px]">
                <div className="text-[32px] leading-[47px] text-white">Stay up to date with us</div>
                <p className="text-base/9 mt-4 text-[20px] leading-[26px]">
                  Sign up to our newsletter for development updates
                </p>
                <div className="mt-[84px] flex space-x-5">
                  <div className="w-full flex-1">
                    <Input
                      value={email}
                      className="border-none bg-[#172630]"
                      type="text"
                      placeholder="Enter your email address"
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn-lg btn-primary"
                    onClick={() => {
                      emailsubmit();
                    }}>
                    Submit
                  </button>
                </div>
              </div>
              <div className="w-[620px] rounded-[20px] bg-[#081825] p-[48px]">
                <div className="text-[32px] leading-[47px] text-white">
                  Join Myria Developers Discord
                </div>
                <p className="text-base/9 mt-4 text-[20px] leading-[26px]">
                  We are funding the builders and creators to power the future of blockchain gaming.
                  Join our developer Discord to learn more.
                </p>
                <div className="mt-8 space-x-5">
                  <a href={socialLinks.discord}>
                    <button
                      className="btn-lg bg-blue/7 text-base/2 flex items-center px-6 py-[12.5px] uppercase"
                      onClick={() => {
                        event('B2B Discord Button Clicked', { campaign: 'B2B' });
                      }}>
                      <DiscordGameIcon size={28} className="mr-2 text-black" />
                      Join our discord
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ContactSalesTeamModal
        open={showContactSalesTeamModal}
        onClose={handleCloseContactSalesTeamModal}
      />
    </Page>
  );
};

export default ForDevelopers;
