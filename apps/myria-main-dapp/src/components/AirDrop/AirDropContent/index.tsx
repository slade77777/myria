import React from 'react';
import clsx from 'clsx';
import { RightSectionAirDrop } from '../RightSectionAirDrop';
import LeftSectionAirDrop from '../LeftSectionAirDrop';

const AirdropContent = () => {
  return (
    <div
      className={clsx('flex h-full flex-row pt-[100px]', {
        "bg-dark bg-[url('/images/nodes/airdrop/background_airdrop.png')] bg-cover bg-bottom bg-no-repeat":
          true
      })}>
      <div className="flex-[1_1_24%] pt-2 overflow-hidden">
        <LeftSectionAirDrop />
      </div>
      <div className="flex-[1_1_76%] w-[76%] h-[calc(100vh-100px)]">
        <RightSectionAirDrop />
      </div>
    </div>
  );
};

export default AirdropContent;
