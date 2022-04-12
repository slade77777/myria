import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { bannerSpacingClassName } from 'src/components/Header/Header';
import JoinTheRevolution from 'src/components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import LinkedinWithBackgroundIcon from '../components/icons/LinkedinWithBackgroundIcon';
import TwitterWithBackgroundIcon from '../components/icons/TwitterWithBackgroundIcon';
import Page from '../components/Page';
import { paddingX } from '../utils';

type Person = {
  name: string;
  position: JSX.Element;
  description: JSX.Element;
  socials: {
    twitter?: string;
    linkedin?: string;
  };
};
const data: Person[] = [
  {
    name: 'Andrew Silber',
    position: <Trans>Co-Founder - CTO</Trans>,
    description: (
      <Trans>
        Andrew has been a tech executive in the gaming industry with a career spanning over 27
        years. He has worked with some of the most recognizable names in the industry, including
        Activision, Electronic Arts, 2K, Ubisoft, Sony, and Midway.{' '}
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/andrewsilber'
    }
  },
  {
    name: 'Jonathan Teoh',
    position: <Trans>Co-Founder - CEO</Trans>,
    description: (
      <Trans>
        A serial entrepreneur and Web3 proponent with over 15 years of founding experience including
        four multinational VC-backed companies in traditional tech. More recently founding
        aliens.com and a blockchain SAAS platform.{' '}
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: ''
    }
  },
  {
    name: 'Brendan Duhamel',
    position: <Trans>Co-Founder - Head of Blockchain</Trans>,
    description: (
      <Trans>
        Brendan brings a decade of experience in blockchain. He has founded an escrow solution on
        the Bitcoin blockchain, a crypto ETF on ethereum, and was blockchain lead for the world’s
        largest trade finance blockchain network.
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/brendan-d-4ba3b698'
    }
  },
  {
    name: 'Dave Malcolm',
    position: <Trans>CMO</Trans>,
    description: (
      <Trans>
        Dave has over 25 years of marketing and management experience. He previously led marketing
        at Banxa and Rockstar Games. Dave also founded Marley Spoon; taking the company from
        inception to IPO.
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://au.linkedin.com/in/davemalcolm'
    }
  },
  {
    name: 'Damian Ordish',
    position: <Trans>CPO (People)</Trans>,
    description: (
      <Trans>
        In his role leading the People team, Damian helps Myria connect, develop and care for its
        global team. Damian brings decades of experience to Myria and was previously Global Head of
        People for Bitmex and Goldman Sachs.
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://hk.linkedin.com/in/damianordish'
    }
  },
  {
    name: 'Moonfrog',
    position: <Trans>Co-Founder - Operations</Trans>,
    description: (
      <Trans>
        A dynamic, entreprenurial executive with over 8+ years in management consulting, focusing on
        organisational transformations for global companies such as Verizon, Vanguard, Kayo
        Streaming and more. More recently founding aliens.com.{' '}
      </Trans>
    ),
    socials: {
      twitter: ' https://twitter.com/0xmoonfrog',
      linkedin: ''
    }
  },
  {
    name: 'Ivan Fortunov',
    position: <Trans>Head of Game Design</Trans>,
    description: (
      <Trans>
        Ivan has 10+ years of experience in the game industry. He has been a lead game designer at
        Gameloft, CrazyLabs, GPG (Ubisoft), Sperasoft, and more, with his games amassing billions of
        downloads.
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/IvanFortunov',
      linkedin: 'https://www.linkedin.com/in/fortunov/'
    }
  },
  {
    name: 'Nick Baynes',
    position: <Trans>Global Head of Studios</Trans>,
    description: (
      <Trans>
        Nick is an industry veteran with over 30 years’ leadership experience in the development,
        production and business of making games. Previously founding AAA studio Hangar 13, owned by
        2K.{' '}
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: ''
    }
  },
  {
    name: 'Brock Chan',
    position: <Trans>Product Lead - Blockchain</Trans>,
    description: (
      <Trans>
        Brock is an entreprenurial product lead with over 10+ years experience working in the tech
        startups and founded his own MarTech company. More recently, he helped scale one of the
        largest blockchain companies focusing on product tokenomics and growth.{' '}
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: ''
    }
  },
  {
    name: 'Craig Stanford',
    position: <Trans>UI/UX Lead</Trans>,
    description: (
      <Trans>
        Craig brings over 10+ years of experience in leading web & app UI/UX design and crafting
        brand identities. He has worked with global companies across industries such as
        communications, financial institutions, media and more.
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/Lennicus',
      linkedin: 'https://www.linkedin.com/in/craiglstanford/'
    }
  },
  {
    name: 'AJ Dimarucot',
    position: <Trans>Art Creative Lead</Trans>,
    description: (
      <Trans>
        AJ has over 20 years of multidisciplinary design experience— from web and apparel design, to
        crafting brand identities. He has worked with global brands including Nike, Adidas and
        Microsoft, among others.{' '}
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/ajdimarucot',
      linkedin: 'https://linkedin.com/in/ajdimarucot'
    }
  },

  {
    name: 'Kidono Huang',
    position: <Trans>Partner Lead</Trans>,
    description: (
      <Trans>
        Kidono is an experienced partner lead with extensive experience managing external
        development engagements. He has worked with some of the largest game production companies,
        including Marvel, Tencent, Winkings and more.
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: ''
    }
  }
];

const Team: React.FC = () => {
  return (
    <Page action={'auto'}>
      <div className={`relative isolate ${bannerSpacingClassName}`}>
        <div
          style={{
            background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
          }}
          className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
        {/* md:top-[50px]: minus banner */}
        <div className={`absolute top-0 left-0 z-[-1] w-full md:top-[50px]`}>
          <Image
            src="/images/team/header-bg.png"
            alt=""
            width={2800}
            height={1466}
            layout="responsive"
          />
        </div>
        <section className={clsx(paddingX, 'hidden pt-[255px] pb-[208px] md:block')}>
          <h1 className="mx-auto max-w-[729px] text-center text-[40px] font-bold leading-[1.25]">
            Contributing to the future of a decentralized internet
          </h1>
        </section>
        <section className={clsx(paddingX, 'pt-[150px] md:pt-0')}>
          <div className="mx-auto max-w-content">
            <h3 className="text-center text-[32px] font-medium leading-[1.25]">
              <Trans>Led by industry experts</Trans>
            </h3>
            <div className="mt-[78px] grid gap-x-[31px] gap-y-[35px] sm:grid-cols-2 lg:grid-cols-3">
              {data.map((person, idx) => (
                <article
                  key={idx}
                  className="flex flex-col rounded-[20px] bg-brand-deep-blue p-[32px] text-center md:pt-[50px] md:pb-[40px]">
                  <p className="body-lg font-bold ">{person.name}</p>
                  <p className="body mt-4 font-bold">{person.position}</p>
                  <p className="body-sm mt-6 mb-auto text-light">{person.description}</p>
                  <div className="mt-[35px] grid grid-flow-col justify-center gap-6 opacity-50">
                    {person.socials.twitter && (
                      <a
                        href={person.socials.twitter}
                        className="w-[24px]"
                        target="_blank"
                        rel="noreferrer">
                        <TwitterWithBackgroundIcon />
                      </a>
                    )}
                    {person.socials.linkedin && (
                      <a
                        href={person.socials.linkedin}
                        className="w-[24px]"
                        target="_blank"
                        rel="noreferrer">
                        <LinkedinWithBackgroundIcon />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[100px]')}>
          <h3 className="text-center text-[40px] font-bold leading-[1.25]">
            <Trans>Our Experience</Trans>
          </h3>
          <div className="mt-[60px] mx-auto max-w-content">
            <ExperenceLogos />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[111px] mb-[127px]')}>
          <div className="mx-auto max-w-content">
            <JoinTheRevolution />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Team;
