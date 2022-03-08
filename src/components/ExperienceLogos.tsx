import Image from 'next/image';
import React from 'react';

const ExperenceLogos: React.FC = () => {
  return (
    <div className="opacity-70">
      <div className="grid gap-[34px] sm:hidden">
        <div className="grid grid-cols-[repeat(3,auto)] items-center justify-center gap-10">
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
        <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center gap-10">
          <div>
            <Image src="/images/blizzard.png" alt="" width={112} height={59} />
          </div>
          <div>
            <Image src="/images/riot.png" alt="" width={127} height={64} />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(3,auto)] items-center justify-center gap-10">
          <div>
            <Image src="/images/marvel.png" alt="" width={183} height={65} />
          </div>
          <div>
            <Image src="/images/gameloft.png" alt="" width={66} height={46} />
          </div>
          <div>
            <Image src="/images/epic.png" alt="" width={96} height={111} />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(2,auto)] items-center justify-center gap-10">
          <div>
            <Image src="/images/goldman.png" alt="" width={195} height={80} />
          </div>
          <div>
            <Image src="/images/tencent.png" alt="" width={132} height={24} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="grid grid-cols-[repeat(5,auto)] items-center justify-between sm:gap-[50px] lg:gap-[90px] xl:gap-[135px]">
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
            <Image src="/images/marvel.png" alt="" width={183} height={85} />
          </div>
        </div>
        <div className="mt-[70px] grid grid-cols-[repeat(5,auto)] items-center justify-between sm:gap-[30px] lg:gap-[50px] xl:gap-[76px]">
          <div>
            <Image src="/images/riot.png" alt="" width={127} height={64} />
          </div>
          <div>
            <Image src="/images/gameloft.png" alt="" width={109.33} height={77.33} />
          </div>
          <div>
            <Image src="/images/epic.png" alt="" width={96} height={111} />
          </div>
          <div>
            <Image src="/images/goldman.png" alt="" width={195} height={80} />
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
