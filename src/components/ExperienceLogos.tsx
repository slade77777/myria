import Image from 'next/image';
import React from 'react';

const ExperenceLogos: React.FC = () => {
  return (
    <div className="opacity-70">
      <div className="grid gap-[34px] sm:hidden">
        <div className="grid gap-10 justify-center grid-cols-[repeat(3,auto)] items-center">
          <div>
            <Image src="/images/unisoft.png" alt="" width={131} height={41} />
          </div>
          <div>
            <Image src="/images/activision.png" alt="" width={131} height={32} />
          </div>
          <div>
            <Image src="/images/ea.png" alt="" width={44} height={46} />
          </div>
        </div>
        <div className="grid gap-10 justify-center grid-cols-[repeat(2,auto)] items-center">
          <div>
            <Image src="/images/blizzard.png" alt="" width={112} height={59} />
          </div>
          <div>
            <Image src="/images/crypto.png" alt="" width={166} height={31} />
          </div>
        </div>
        <div className="grid gap-10 justify-center grid-cols-[repeat(3,auto)] items-center">
          <div>
            <Image src="/images/warner-bros.png" alt="" width={52} height={54} />
          </div>
          <div>
            <Image src="/images/gameloft.png" alt="" width={66} height={46} />
          </div>
          <div>
            <Image src="/images/epic.png" alt="" width={96} height={111} />
          </div>
        </div>
        <div className="grid gap-10 justify-center grid-cols-[repeat(2,auto)] items-center">
          <div>
            <Image src="/images/greenpanda.png" alt="" width={137} height={26} />
          </div>
          <div>
            <Image src="/images/tencent.png" alt="" width={132} height={24} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="grid sm:gap-[50px] lg:gap-[90px] xl:gap-[135px] justify-between grid-cols-[repeat(5,auto)] items-center">
          <div>
            <Image src="/images/unisoft.png" alt="" width={216} height={69} />
          </div>
          <div>
            <Image src="/images/activision.png" alt="" width={216} height={52} />
          </div>
          <div>
            <Image src="/images/ea.png" alt="" width={71} height={76} />
          </div>
          <div>
            <Image src="/images/blizzard.png" alt="" width={185} height={97} />
          </div>
          <div>
            <Image src="/images/warner-bros.png" alt="" width={86} height={90} />
          </div>
        </div>
        <div className="mt-[70px] grid sm:gap-[30px] lg:gap-[50px] xl:gap-[76px] justify-between grid-cols-[repeat(5,auto)] items-center">
          <div>
            <Image src="/images/crypto.png" alt="" width={274} height={52.6} />
          </div>
          <div>
            <Image src="/images/gameloft.png" alt="" width={109.33} height={77.33} />
          </div>
          <div>
            <Image src="/images/epic.png" alt="" width={96} height={111} />
          </div>
          <div>
            <Image src="/images/greenpanda.png" alt="" width={227} height={44} />
          </div>
          <div>
            <Image src="/images/tencent.png" alt="" width={218} height={41} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperenceLogos;
