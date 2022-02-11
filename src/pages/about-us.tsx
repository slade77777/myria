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
  position: string;
  description: string;
  socials: {
    twitter?: string;
    linkedin?: string;
  };
};
const data: Person[] = [
  {
    name: 'Andrew Silber',
    position: t`Co-Founder - CTO`,
    description:
      t`Andrew has been a tech executive in the gaming industry with a career spanning over 27 years. He has worked with some of the most recognizable names in the industry, including Activision, Electronic Arts, 2K, Ubisoft, Sony, and Midway. `,
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/andrewsilber'
    }
  },
  {
    name: 'goose.eth',
    position: t`Co-Founder - Project Lead`,
    description:
      t`A serial entrepreneur and Web3 proponent with over 15 years of founding experience including four multinational VC-backed companies in traditional tech. More recently founding aliens.com and a blockchain P2E platform. `,
    socials: {
      twitter: 'https://twitter.com/gooseara',
      linkedin: ''
    }
  },
  {
    name: 'Brendan Duhamel',
    position: t`Head of Blockchain`,
    description:
      t`Brendan brings a decade of experience in blockchain. He has founded an escrow solution on the Bitcoin blockchain, a crypto ETF on ethereum, and was blockchain lead for the world’s largest trade finance blockchain network.`,
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/brendan-d-4ba3b698'
    }
  },
  {
    name: 'Ivan Fortunov',
    position: t`Head of Game Design`,
    description:
      t`Ivan has 10+ years of experience in the game industry. He has been a lead game designer at Gameloft, CrazyLabs, GPG (Ubisoft), Sperasoft, and more, with his games amassing billions of downloads.`,
    socials: {
      twitter: 'https://twitter.com/IvanFortunov',
      linkedin: 'https://www.linkedin.com/in/fortunov/'
    }
  },
  {
    name: 'Lucas Bean',
    position: t`Head of Marketing`,
    description:
      t`Lucas brings over 22+ years of expertise in marketing. He was previously Head of Global Marketing for iconic gaming giants such as Atari and Sony and has founded multiple ventures, including Engage:BDR that is now a public listed company.`,
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/lucasbean/'
    }
  },
  {
    name: 'Metafrog',
    position: t`Co-Founder - Operations`,
    description:
      t`A dynamic, entreprenurial executive with over 8+ years in management consulting, focusing on organisational transformations for global companies such as Verizon, Vanguard, Kayo Streaming and more. More recently founding aliens.com.  `,
    socials: {
      twitter: 'https://twitter.com/0xMetaFrog',
      linkedin: ''
    }
  },
  {
    name: 'Jem Law',
    position: t`Marketing Manager`,
    description:
      t`Jem brings a breadth of business operations and strategy experience, including 10+ years working with corporate companies in pitching and fundraising, and 6 years managing strategy execution for tech and blockchain companies.`,
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/jemimalaw/'
    }
  },
  {
    name: 'AJ Dimarucot',
    position: t`Art Creative Lead`,
    description:
      t`AJ has over 20 years of multidisciplinary design experience— from web and apparel design, to crafting brand identities. He has worked with global brands including Nike, Adidas and Microsoft, among others. `,
    socials: {
      twitter: 'https://twitter.com/ajdimarucot',
      linkedin: 'https://linkedin.com/in/ajdimarucot'
    }
  },
  {
    name: 'Brock',
    position: t`Product Lead - Blockchain`,
    description:
      t`Brock is an entreprenurial product lead with over 10+ years experience working in the tech startups and founded his own MarTech company. More recently, he helped scale one of the largest blockchain companies focusing on product tokenomics and growth. `,
    socials: {
      twitter: '',
      linkedin: ''
    }
  },

  {
    name: 'Craig Stanford',
    position: t`UI/UX Lead`,
    description:
      t`Craig brings over 10+ years of experience in leading web & app UI/UX design and crafting brand identities. He has worked with global companies across industires such as communications, financial institutions, media and more.`,
    socials: {
      twitter: 'https://twitter.com/Lennicus',
      linkedin: 'https://www.linkedin.com/in/craiglstanford/'
    }
  },
  {
    name: 'Antonio Molina',
    position: t`Game Producer`,
    description:
      t`With 15+ year experience working in the gaming industry, Antonio has contributed to some of the worlds leading titles and brands such as The Witcher, Disney and more. `,
    socials: {
      twitter: '',
      linkedin: 'https://www.linkedin.com/in/antoniomolina34/'
    }
  },
  {
    name: 'Kidono Huang',
    position: t`Partner Lead`,
    description:
      t`Kidono is an experienced partner lead with extensive experience managing external development engagements. He has worked with some of the largest game production companies, including Marvel, Tencent, Winkings and more.`,
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
    title: t`Gameplay first`,
    description: t`Fun, high-quality and free are our core gameplay tenets.  `
  },
  {
    icon: (
      <div className="w-[32px]">
        <RadioIcon />
      </div>
    ),
    title: t`Free to play`,
    description:
      t`We believe in open and equitable access, enabling more people to experience and enjoy the benefits of blockchain and the metaverse.`
  },
  {
    icon: (
      <div className="w-[32px]">
        <SafetyIcon />
      </div>
    ),
    title: t`Empowering players`,
    description:
      t`We believe players should have true verifiable ownership and control over in-game assets. `
  },
  {
    icon: (
      <div className="w-[32px]">
        <UserIcon />
      </div>
    ),
    title: t`Powered by the community`,
    description:
      t`Myria is community powered and governed through the Myria DAO. We are handing the power back to the people to build a better metaverse. `
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
            className="absolute left-0 h-[783px] w-full z-[-1]">
            <div className="relative w-full h-full ">
              <Image src="/images/header-bg.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
              <Trans>Our Vision</Trans>
            </h1>
            <p className="heading-sm max-w-[875px] mx-auto mt-[37px] text-center">
              <Trans>Enhancing the power of play through blockchain, enabling economic access and
              ownership, and driving a new era of opportunity, exploration and freedom for every
              human on Earth.</Trans>
            </p>
          </div>
          <div className="w-full mx-auto max-w-content mt-[65px] grid md:grid-cols-2 gap-[36px] md:gap-[48px] items-center">
            <div className="flex justify-center">
              <Image src="/images/about-us/principle.png" width={395} height={720} alt="" />
            </div>
            <div className="md:pr-[100px]">
              <p className="caption text-brand-light-blue"><Trans>SHIFTING POWER BACK TO THE PEOPLE</Trans></p>
              <h3 className="mt-2 heading-sm md:heading-md"><Trans>Our Principles</Trans></h3>
              <div>
                {principles.map((item, idx) => (
                  <div
                    ref={(el) => (elRefs.current[idx] = el)}
                    style={{
                      boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
                    }}
                    className={clsx(
                      'flex items-start p-6 mt-6 rounded-[20px] opacity-50 transition duration-300',
                      {
                        'bg-brand-deep-blue !opacity-100': idx == currentPrinciple
                      }
                    )}
                    key={idx}>
                    <div className="w-[32px] flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[24px] leading-[1.25]">{item.title}</h4>
                      <p className="mt-2 body text-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[126px]">
            <h3 className="text-center heading-sm md:heading-md"><Trans>Our Experience</Trans></h3>
            <div className="mt-[60px]">
              <ExperenceLogos />
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[175px]')}>
          <div className="mx-auto max-w-content">
            <h3 className="text-center heading-sm md:heading-md"><Trans>Led by industry experts</Trans></h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-[78px] gap-x-[31px] gap-y-[35px]">
              {data.map((person, idx) => (
                <article
                  key={idx}
                  className="text-center flex flex-col rounded-[20px] md:pt-[50px] md:pb-[40px] p-[32px] bg-brand-deep-blue">
                  <p className="font-bold body-lg ">{person.name}</p>
                  <p className="mt-4 font-bold body">{person.position}</p>
                  <p className="mt-6 mb-auto body-sm text-light">{person.description}</p>
                  <div className="grid grid-flow-col justify-center gap-6 mt-[35px] opacity-50">
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
