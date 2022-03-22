import Image from 'next/image';
import React from 'react';
import AllianceModal from './AllianceModal';

const ChooseAlliance: React.FC = () => {
  return (
    <>
      <AllianceModal open={false} onClose={() => {}} />
      <div className="relative grid grid-cols-1 grid-rows-1">
        <Image
          src="/images/nodes/insignia/choose-alliance-bg.png"
          alt=""
          layout="responsive"
          width={4320}
          height={2642}
        />
        <div className="pb-[] absolute inset-0 bottom-[22.91%] flex items-center pl-[9.7%] pr-[8.07%]">
          <div className="h-full w-[10.58%] bg-red-500/10"></div>
          <div className="ml-[31.1%] h-full w-[15.188%] bg-red-500/10"></div>
          <div className="ml-auto h-full w-[17.06%] bg-red-500/10"></div>
        </div>
      </div>
    </>
  );
};

export default ChooseAlliance;
