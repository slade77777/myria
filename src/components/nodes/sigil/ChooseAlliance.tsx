import Image from 'next/image';
import React from 'react';
import AllianceModal from './AllianceModal';

interface SigilProps {
  sigilImg: string;
  width: number;
  height: number;
  className?: string;
  onActive: (id: string | null) => void;
  isActive: boolean;
  id: string;
}

interface SigilInfoProps {
  className?: string;
  onActive: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  isActive: boolean;
  id: string;
  name: string;
  desc: string;
}

interface ChooseAllianceProps {
  onNext: () => void
  onHoverSigil: (id: string | null) => void
}

type Sigil = {
  id: string;
  img: string;
  className: string;
  width: number;
  height: number;
  name: string;
  desc: string;
};

const SIGILS: Sigil[] = [
  {
    id: 'a',
    img: '/images/nodes/insignia/alliance_sigilA.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'left-0 w-[30%]',
    name: 'Alliance 1',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  },
  {
    id: 'b',
    img: '/images/nodes/insignia/alliance_sigilB.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'w-[30%]',
    name: 'Alliance 2',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  },
  {
    id: 'c',
    img: '/images/nodes/insignia/alliance_sigilC.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'right-0 w-[30%]',
    name: 'Alliance 3',
    desc: "I'm baby whatever small batch chicharrones kale chips unicorn everyday carry, drinking vinegar you probably haven't heard of them."
  }
];

const Sigil = ({ id, sigilImg, width, height, className, isActive, onActive }: SigilProps) => {
  const shadowEffect = React.useRef(
    Array(100)
      .fill(0)
      .map(() => `${Math.random() * 80 - 40}px ${Math.random() * 200 + 200}px 8px 4px white`)
      .join(',')
  );
  return (
    <div
      onMouseEnter={() => onActive(id)}
      onMouseLeave={() => onActive(null)}
      className={`absolute bottom-[35%] flex flex-col items-center justify-center pb-[100px] ${
        className || ''
      }`}>
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center ${
          isActive ? 'z-20' : 'z-0'
        }`}>
        <div className="flex w-[35%] animate-float items-center justify-center">
          <Image src={sigilImg} alt="" layout="intrinsic" width={width} height={height} />
        </div>

        <div
          className="z-30 w-0 flex-1"
          style={{
            boxShadow: `0 0 60px 20px white, 25px 15px 50px 10px #fff, -5px -5px 30px 5px #fff ${
              isActive
                ? ',0 0 40px 10px white, 0px -100px 40px 10px white, 0px -180px 40px 40px rgba(255,255,255,0.2)'
                : ''
            }`
          }}
        />
        {isActive && (
          <div className="absolute bottom-[-50px] h-[200px] w-[150px]">
            <div className="relative flex h-full w-full justify-center overflow-hidden">
              <div
                className="absolute bottom-0 h-[4px] w-[4px] animate-starUp"
                style={{
                  content: '',
                  boxShadow: shadowEffect.current
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SigilInfo = ({ id, className, isActive, onActive, onSelect, name, desc }: SigilInfoProps) => {
  return (
    <div
      onMouseEnter={() => onActive(id)}
      onMouseLeave={() => onActive(null)}
      className={`${
        isActive ? 'z-20' : 'z-0'
      } absolute bottom-0 flex-col items-center justify-center ${className || ''}`}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex w-[35%] items-center justify-center">
          <Image
            src="/images/nodes/insignia/sigil_info_box.png"
            alt=""
            layout="intrinsic"
            width={600}
            height={978}
          />
          <div className="absolute bottom-0 flex h-full flex-col items-center justify-end px-[22px]">
            <span className="mb-2 text-[20px] font-bold 2xl:text-[28px]">{name}</span>
            <div
              className={`flex flex-col items-center justify-end transition-all ${
                isActive ? 'opacity-100' : 'h-[100px] opacity-0'
              }`}>
              <span className="mb-4 text-center text-[10px] 2xl:text-[14px]">{desc}</span>
              <button
                className="btn-sm btn-primary flex w-[80%] items-center 2xl:btn-md"
                onClick={() => onSelect(id)}>
                SELECT
              </button>
            </div>
          </div>
        </div>

        {isActive && (
          <div
            className="z-30 w-0 flex-1"
            style={{
              boxShadow: `0 0 60px 20px white, 25px 15px 50px 10px #fff, -5px -5px 30px 5px #fff ${
                isActive
                  ? ',0 0 40px 10px white, 0px -100px 40px 10px white, 0px -180px 40px 40px rgba(255,255,255,0.2)'
                  : ''
              }`
            }}
          />
        )}
      </div>
    </div>
  );
};

const ChooseAlliance = ({ onNext, onHoverSigil }: ChooseAllianceProps) => {
  const [activeSigil, setActiveSigil] = React.useState<string | null>(null);
  const handleHoverSigil = (id: string | null) => {
    setActiveSigil(id);
    onHoverSigil(id);
  }
  return (
    <>
      <AllianceModal open={false} onClose={() => {}} />
      <div className="relative grid min-h-screen grid-cols-1 grid-rows-1">
        <div className="pointer-events-none relative h-full w-full object-cover object-center">
          <Image src="/images/nodes/insignia/alliance_bg.png" alt="" layout="fill" />
        </div>
        <div className="absolute left-0 bottom-0 w-full">
          <div className="relative flex h-[340px] w-full items-end justify-center">
            {SIGILS.map((sigil) => (
              <SigilInfo
                key={sigil.id}
                id={sigil.id}
                className={sigil.className}
                name={sigil.name}
                desc={sigil.desc}
                isActive={sigil.id === activeSigil}
                onActive={handleHoverSigil}
                onSelect={onNext}
              />
            ))}
          </div>
          <div className="relative w-full object-cover object-center">
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
                  onActive={handleHoverSigil}
                />
              ))}
            </div>
          </div>
          {!!activeSigil && (
            <div className="pointer-events-none fixed top-0 left-0 z-[10] h-screen w-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-[2px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default ChooseAlliance;
