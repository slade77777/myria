import Image from 'next/image';
import React, { useState } from 'react';
import { SUPPORT_SOUND, soundService } from 'src/sound';
import AllianceModal from './AllianceModal';

interface SigilProps {
  sigilImg: string;
  width: number;
  height: number;
  className?: string;
  onActive: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  isActive: boolean;
  id: string;
  name: string;
  desc: string;
  order: number;
}
interface ChooseAllianceProps {
  onNext: () => void;
}

type Sigil = {
  id: string;
  img: string;
  className: string;
  width: number;
  height: number;
  name: string;
  desc: string;
  order: number;
};

const SIGILS: Sigil[] = [
  {
    id: 'a',
    order: 1,
    img: '/images/nodes/insignia/alliance_sigilA.png',
    width: 584 / 2,
    height: 748 / 2,
    className: 'left-[2%] w-[24%]',
    name: 'Alliance ONE',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  },
  {
    id: 'b',
    order: 2,
    img: '/images/nodes/insignia/alliance_sigilB.png',
    width: 584 / 2,
    height: 748 / 2,
    className: 'w-[24%]',
    name: 'Alliance TWO',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  },
  {
    id: 'c',
    order: 3,
    img: '/images/nodes/insignia/alliance_sigilC.png',
    width: 584 / 2,
    height: 748 / 2,
    className: 'right-[3%] w-[24%]',
    name: 'Alliance THREE',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  }
];

const PARTICLES = Array(20)
  .fill(0)
  .map((_, index) => {
    const blur = Math.round(Math.random() * 2 + 1);
    const spread = Math.round(Math.random() * 3 + 1);
    const duration = Math.round(Math.random() * 4 + 2);
    const boxShadow = Array(Math.round(Math.random() * 5))
      .fill(0)
      .map(() => `${Math.random() * 100 - 50}px ${Math.random() * -60}px ${blur}px ${spread}px white`)
      .join(',');

    return { id: index, boxShadow, animationDuration: `${duration}s`, };
  });

const Sigil = ({
  id,
  sigilImg,
  width,
  height,
  className,
  isActive,
  onActive,
  onSelect,
  name,
  desc,
  order
}: SigilProps) => {
  const [isFirstTimeActive, setIsFirstTimeActive] = React.useState(false);

  return (
    <div
      onMouseEnter={() => {
        onActive(id);
        soundService.playSound(SUPPORT_SOUND.SIGIL_HOVER);
      }}
      onMouseLeave={() => onActive(null)}
      onMouseOver={() => {
        if (!isFirstTimeActive) {
          onActive(id);
          soundService.playSound(SUPPORT_SOUND.SIGIL_HOVER);
        }
        setIsFirstTimeActive(true);
      }}
      className={`absolute bottom-[40%] flex flex-col items-center justify-center ${
        className || ''
      }`}>
      <div
        className={`relative flex h-full w-full flex-col items-center justify-end bg-gradient-to-b pb-[8px] pt-[12px] xl:px-[8px] xl:pt-[24px]  ${
          isActive ? 'z-20 from-[rgba(0,0,0,0.5)] to-transparent' : 'z-0 from-transparent'
        }`}>
        <div className="flex items-center">
          <div className="h-[1px] flex-1 bg-border-blue opacity-20">
            <div className="absolute top-0 left-0 translate-x-[-7px] translate-y-[-10px]">
              <svg
                width="80"
                height="69"
                viewBox="0 0 80 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 12C0 5.37259 5.37258 0 12 0H72L80 8H18C11.3726 8 8 11.3726 8 18V69L0 61V12ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10ZM6 14C6 15.1046 5.10457 16 4 16C2.89543 16 2 15.1046 2 14C2 12.8954 2.89543 12 4 12C5.10457 12 6 12.8954 6 14ZM14 6C15.1046 6 16 5.10457 16 4C16 2.89543 15.1046 2 14 2C12.8954 2 12 2.89543 12 4C12 5.10457 12.8954 6 14 6ZM5 20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20C3 19.4477 3.44772 19 4 19C4.55228 19 5 19.4477 5 20ZM4.5 24C4.77614 24 5 24.2239 5 24.5C5 24.7761 4.77614 25 4.5 25C4.22386 25 4 24.7761 4 24.5C4 24.2239 4.22386 24 4.5 24ZM19 2.5H59.5L62.5 5.5H19V2.5ZM63 2.5L66 5.5H68.5L65.5 2.5H63Z"
                  fill="#5BA7D2"
                />
              </svg>
            </div>
            <div
              className={`absolute top-0 left-0 w-[2px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent transition-all delay-150 ${
                isActive ? 'h-full' : 'h-0'
              }`}
            />
          </div>
          <div className="h-[1px] flex-1 bg-border-blue opacity-20">
            <div className="absolute top-0 right-0 translate-x-[7px] translate-y-[-10px]">
              <svg
                width="80"
                height="69"
                viewBox="0 0 80 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M80 12C80 5.37259 74.6274 0 68 0H8L0 8H62C68.6274 8 72 11.3726 72 18V69L80 61V12ZM73 10C71.3431 10 70 8.65685 70 7C70 5.34315 71.3431 4 73 4C74.6569 4 76 5.34315 76 7C76 8.65685 74.6569 10 73 10ZM74 14C74 15.1046 74.8954 16 76 16C77.1046 16 78 15.1046 78 14C78 12.8954 77.1046 12 76 12C74.8954 12 74 12.8954 74 14ZM66 6C64.8954 6 64 5.10457 64 4C64 2.89543 64.8954 2 66 2C67.1046 2 68 2.89543 68 4C68 5.10457 67.1046 6 66 6ZM75 20C75 20.5523 75.4477 21 76 21C76.5523 21 77 20.5523 77 20C77 19.4477 76.5523 19 76 19C75.4477 19 75 19.4477 75 20ZM75.5 24C75.2239 24 75 24.2239 75 24.5C75 24.7761 75.2239 25 75.5 25C75.7761 25 76 24.7761 76 24.5C76 24.2239 75.7761 24 75.5 24ZM61 2.5H20.5L17.5 5.5H61V2.5ZM17 2.5L14 5.5H11.5L14.5 2.5H17Z"
                  fill="#5BA7D2"
                />
              </svg>
            </div>
            <div
              className={`absolute top-0 right-0 w-[2px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent transition-all delay-300 ${
                isActive ? 'h-full' : 'h-0'
              }`}
            />
          </div>
        </div>
        <div
          className={`absolute px-1 transition-all delay-100 ${
            isActive ? 'top-[-15px]' : 'top-[10px]'
          }`}>
          <span
            className="text-[20px] font-extrabold uppercase tracking-tight text-white"
            style={{ textShadow: '0px 0px 10px rgba(154, 201, 227, 0.5)' }}>
            {name}
          </span>
        </div>
        <span
          className={`w-full overflow-hidden text-center font-normal text-light transition-all delay-300 ${
            isActive ? 'h-auto text-[14px] opacity-100' : 'h-0 text-[8px] opacity-0'
          }`}
          style={{ textShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)' }}>
          {desc}
        </span>
        <div
          className={`flex w-[60%] flex-col items-center 2xl:w-[70%] ${order === 2 ? 'pt-5' : ''}`}>
          <div className="flex w-full animate-float items-center justify-center">
            <Image src={sigilImg} alt="" layout="intrinsic" width={width} height={height} />
          </div>

          {/* glow effect */}
          <div className="relative flex h-[40px] w-[150px] justify-center xl:w-[200px]">
            <div
              className="absolute bottom-0 h-[100px] w-0"
              style={{
                boxShadow: `0 0 60px 20px white, 25px 15px 50px 10px #fff, -5px -5px 30px 5px #fff ${
                  isActive
                    ? ',0 0 40px 10px white, 0px -100px 40px 10px white, 0px -180px 40px 40px rgba(255,255,255,0.2)'
                    : ''
                }`
              }}
            />
            {isActive && (
              <div className="absolute bottom-0 flex h-[100px] w-full justify-center">
                {PARTICLES.map((particle) => (
                  <div
                    key={particle.id}
                    className="absolute bottom-0 h-[1px] w-[1px] animate-starUp rounded-full"
                    style={{
                      content: '',
                      animationDuration: particle.animationDuration,
                      boxShadow: particle.boxShadow,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          {/* end glow effect */}
        </div>

        <div
          className={`absolute  flex h-[100px] w-full items-end justify-center transition-all delay-300 ${
            isActive ? 'bottom-[-100px] opacity-100' : 'bottom-0 opacity-0'
          }`}>
          <button
            className="btn-md btn-primary flex w-[60%] items-center"
            onClick={() => {
              onSelect(id);
              soundService.playSound(SUPPORT_SOUND.SIGIL_SELECT);
            }}>
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

const ChooseAlliance = ({ onNext }: ChooseAllianceProps) => {
  const [activeSigil, setActiveSigil] = useState<string | null>(null);
  const handleHoverSigil = (id: string | null) => {
    setActiveSigil(id);
  };

  const [selectedAlliance, setSelectedAlliance] = useState<Sigil['id'] | null>(null);
  return (
    <>
      <AllianceModal
        open={!!selectedAlliance}
        onJoin={onNext}
        onClose={() => {
          setSelectedAlliance(null);
        }}
      />
      <div className="relative top-[80px] grid min-h-[calc(100vh-80px)] min-w-[1200px] grid-cols-1 grid-rows-1 overflow-hidden">
        <div className="pointer-events-none fixed top-[-80px] h-full w-full object-cover object-center">
          <Image src="/images/nodes/insignia/alliance_bg.jpeg" alt="" layout="fill" />
        </div>
        <div className="absolute left-0 bottom-0 w-full">
          <div className="relative w-full object-cover  object-center">
            <Image
              src="/images/nodes/insignia/alliance_stand.png"
              alt=""
              layout="responsive"
              width={3840}
              height={1434}
            />
            <div className="absolute top-0 flex h-full w-full items-center justify-center">
              {SIGILS.map((sigil) => (
                <Sigil
                  key={sigil.id}
                  id={sigil.id}
                  sigilImg={sigil.img}
                  width={sigil.width}
                  height={sigil.height}
                  className={sigil.className}
                  isActive={sigil.id === activeSigil}
                  name={sigil.name}
                  desc={sigil.desc}
                  order={sigil.order}
                  onActive={handleHoverSigil}
                  onSelect={(id) => setSelectedAlliance(id)}
                />
              ))}
            </div>
          </div>
          <div
            className={`pointer-events-none fixed top-[80px] left-0 z-[10] h-screen min-h-[calc(100vh-80px)] w-screen bg-gradient-to-t  transition-all delay-200 ${
              !!activeSigil
                ? 'from-[rgba(0,0,0,0.5)] to-transparent backdrop-blur-[2px] '
                : 'from-black  via-transparent to-transparent backdrop-blur-none'
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseAlliance;
