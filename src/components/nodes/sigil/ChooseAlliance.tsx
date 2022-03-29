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
  onClick: () => void;
}

type Sigil = {
  id: string;
  img: string;
  className: string;
  width: number;
  height: number;
};

const SIGILS: Sigil[] = [
  {
    id: 'a',
    img: '/images/nodes/insignia/alliance_sigilA.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'left-0 w-[30%]'
  },
  {
    id: 'b',
    img: '/images/nodes/insignia/alliance_sigilB.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'w-[30%]'
  },
  {
    id: 'c',
    img: '/images/nodes/insignia/alliance_sigilC.png',
    width: 584 / 3,
    height: 748 / 3,
    className: 'right-0 w-[30%]'
  }
];

const Sigil = ({
  id,
  sigilImg,
  width,
  height,
  className,
  isActive,
  onActive,
  onClick
}: SigilProps) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onActive(id)}
      onMouseLeave={() => onActive(null)}
      className={`absolute top-[10%] flex h-[45%] flex-col items-center justify-center ${
        className || ''
      }`}>
      <div
        className={`flex h-full w-full flex-col items-center justify-center ${
          isActive ? 'z-20' : 'z-0'
        }`}>
        <div className="flex w-[35%] items-center justify-center">
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
      </div>
    </div>
  );
};

type Props = {
  onNext: () => void;
};

const ChooseAlliance: React.FC<Props> = ({ onNext }) => {
  const [activeSigil, setActiveSigil] = React.useState<string | null>(null);

  return (
    <>
      <AllianceModal open={false} onClose={() => {}} />
      <div className="relative grid min-h-screen grid-cols-1 grid-rows-1">
        <div className="pointer-events-none h-full w-[100%] object-cover object-center">
          <Image src="/images/nodes/insignia/alliance_bg.png" alt="" layout="fill" />
        </div>
        <div className="relative w-[100%] object-cover object-center">
          <Image
            src="/images/nodes/insignia/alliance_stand.png"
            alt=""
            layout="responsive"
            width={3840}
            height={1434}
          />
          <div className="absolute top-0 flex h-full w-[100%] items-center justify-center">
            {SIGILS.map((sigil) => (
              <Sigil
                key={sigil.id}
                id={sigil.id}
                sigilImg={sigil.img}
                width={sigil.width}
                height={sigil.height}
                className={sigil.className}
                isActive={sigil.id === activeSigil}
                onActive={setActiveSigil}
                onClick={onNext}
              />
            ))}
          </div>
        </div>
        {!!activeSigil && (
          <div
            className={`$z-[10] pointer-events-none fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-[2px]`}
          />
        )}
      </div>
    </>
  );
};

export default ChooseAlliance;
