import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import LoveIcon from 'src/components/icons/LoveIcon';
import RadioIcon from 'src/components/icons/RadioIcon';
import SafetyIcon from 'src/components/icons/SafetyIcon';
import UserIcon from 'src/components/icons/UserIcon';
import JoinTheRevolution from 'src/components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import { headerHeight } from '../components/Header';
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
    name: 'goose.eth',
    position: <Trans>Co-Founder - Project Lead</Trans>,
    description: (
      <Trans>
        A serial entrepreneur and Web3 proponent with over 15 years of founding experience including
        four multinational VC-backed companies in traditional tech. More recently founding
        aliens.com and a blockchain P2E platform.{' '}
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/gooseara',
      linkedin: ''
    }
  },
  {
    name: 'Brendan Duhamel',
    position: <Trans>Head of Blockchain</Trans>,
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
    name: 'Ivan Fortunov',
    position: <Trans>Head of Game Design</Trans>,
    description: (
      <Trans>
        Ivan has 10+ years of experience in the game industry. He has been a lead game designer at
        Gameloft, CrazyLabs, GPG (Ubisoft), Sperasoft, and more, with his games amassing half a
        billion downloads.
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/IvanFortunov',
      linkedin: 'https://www.linkedin.com/in/fortunov/'
    }
  },
  {
    name: 'Brock',
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
    name: 'Moonfrog',
    position: <Trans>Co-Founder - Operations</Trans>,
    description: (
      <Trans>
        A dynamic, entreprenurial executive with over 8+ years in management consulting, focusing on
        organisational transformations for global companies such as Bandai Namco, Verizon, Vanguard,
        Kayo Streaming and more. More recently founding aliens.com.{' '}
      </Trans>
    ),
    socials: {
      twitter: ' https://twitter.com/0xmoonfrog',
      linkedin: ''
    }
  },

  {
    name: 'Antonio Molina',
    position: <Trans>Games Producer</Trans>,
    description: (
      <Trans>
        With 15+ year experience working in the gaming industry, Antonio has contributed to some of
        the worlds leading titles and brands such as The Witcher, Disney and more.{' '}
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/antoniomolina34/'
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
    name: 'Jem Law',
    position: <Trans>Marketing Manager</Trans>,
    description: (
      <Trans>
        Jem brings a breadth of business operations and strategy experience, including 10+ years
        working with corporate companies in pitching and fundraising, and 6 years managing strategy
        execution for tech and blockchain companies.
      </Trans>
    ),
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/jemimalaw/'
    }
  },

  {
    name: 'Craig Stanford',
    position: <Trans>UI/UX Lead</Trans>,
    description: (
      <Trans>
        Craig brings over 10+ years of experience in leading web & app UI/UX design and crafting
        brand identities. He has worked with global companies across industires such as
        communications, financial institutions, media and more.
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/Lennicus',
      linkedin: 'https://www.linkedin.com/in/craiglstanford/'
    }
  },
  {
    name: 'Hunter Jo',
    position: <Trans>Community Lead</Trans>,
    description: (
      <Trans>
        Hunter is an intrapreneur in the crypto space since 2016, joining projects at the forefront
        of innovation and helping them build global communities. He has catalyzed and amplified
        partnerships with some of the largest projects and influencers in this space.{' '}
      </Trans>
    ),
    socials: {
      twitter: 'https://twitter.com/CountGupula',
      linkedin: ''
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

const principles = [
  {
    icon: (
      <div className="w-[32px]">
        <LoveIcon />
      </div>
    ),
    title: <Trans>Gameplay first</Trans>,
    description: <Trans>Fun, high-quality and free are our core gameplay tenets. </Trans>
  },
  {
    icon: (
      <div className="w-[32px]">
        <RadioIcon />
      </div>
    ),
    title: <Trans>Free to play</Trans>,
    description: (
      <Trans>
        We believe in open and equitable access, enabling more people to experience and enjoy the
        benefits of blockchain and the metaverse.
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[32px]">
        <SafetyIcon />
      </div>
    ),
    title: <Trans>Empowering players</Trans>,
    description: (
      <Trans>
        We believe players should have true verifiable ownership and control over in-game assets.{' '}
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[32px]">
        <UserIcon />
      </div>
    ),
    title: <Trans>Powered by the community</Trans>,
    description: (
      <Trans>
        Myria is community powered and governed through the Myria DAO. We are handing the power back
        to the people to build a better metaverse.{' '}
      </Trans>
    )
  }
];

const AboutUs: React.FC = () => {
  const [currentPrinciple, setCurrentPrinciple] = useState(0);

  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let idx = currentPrinciple;
      for (let i = 0; i < elRefs.current.length; i++) {
        const el = elRefs.current[i];
        const elInfo = el?.getBoundingClientRect();
        if (elInfo && elInfo.top > 100 && elInfo.top < 300) {
          idx = i;
        }
      }
      setCurrentPrinciple(idx);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPrinciple]);

  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight,
            backgroundPositionY: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen ')}>
          <div
            style={{
              top: headerHeight
            }}
            className="absolute left-0 z-[-1] h-[783px] w-full">
            <div className="relative h-full w-full ">
              <Image src="/images/header-bg_op.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mx-auto mt-[50px] max-w-[756px] text-center text-brand-white md:heading-massive md:mt-[120px]">
              <Trans>Our Vision</Trans>
            </h1>
            <p className="heading-sm mx-auto mt-[37px] max-w-[875px] text-center">
              <Trans>
                Enhancing the power of play through blockchain, enabling economic access and
                ownership, and driving a new era of opportunity, exploration and freedom.
              </Trans>
            </p>
          </div>
          <div className="mx-auto mt-[65px] grid w-full max-w-content items-center gap-[36px] md:grid-cols-2 md:gap-[48px]">
            <div className="flex justify-center">
              <Image src="/images/about-us/principle-alt.png" width={507} height={717} alt="" />
            </div>
            <div className="md:pr-[100px]">
              <p className="caption text-brand-light-blue">
                <Trans>SHIFTING POWER BACK TO THE PEOPLE</Trans>
              </p>
              <h3 className="heading-sm mt-2 md:heading-md">
                <Trans>Our Principles</Trans>
              </h3>
              <div>
                {principles.map((item, idx) => (
                  <div
                    ref={(el) => (elRefs.current[idx] = el)}
                    style={{
                      boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
                    }}
                    className={clsx(
                      'mt-6 flex items-start rounded-[20px] p-6 opacity-50 transition duration-300',
                      {
                        'bg-brand-deep-blue !opacity-100': idx == currentPrinciple
                      }
                    )}
                    key={idx}>
                    <div className="w-[32px] flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="text-[24px] font-bold leading-[1.25]">{item.title}</h4>
                      <p className="body mt-2 text-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[126px]">
            <h3 className="heading-sm text-center md:heading-md">
              <Trans>Our Experience</Trans>
            </h3>
            <div className="mt-[60px]">
              <ExperenceLogos />
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[175px]')} id="teams">
          <div className="mx-auto max-w-content">
            <h3 className="heading-sm text-center md:heading-md">
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
        <section className={clsx(paddingX, 'mt-[119px] mb-[127px]')}>
          <div className="mx-auto max-w-content">
            <JoinTheRevolution />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default AboutUs;
