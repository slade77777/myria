import React from 'react';
import { SubtractLeft } from './Subtract';

const AllianceInfo: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="h-[1px] flex-1 bg-border-blue opacity-20">
          <div className="absolute top-0 left-0 translate-x-[-7px] translate-y-[4px]">
            <SubtractLeft />
          </div>
          <div className="absolute top-0 left-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent" />
        </div>
        <p className="sigil-text ml-4 text-[18px] font-extrabold leading-[1.25]">PROFILE</p>
      </div>
      <div className="flex h-[441px] flex-col items-center px-4 pt-[47px] pb-[30px] text-center">
        <div className="relative">
          <div className="relative h-[108px] w-[108px] rounded-full border border-[#A077DE] bg-[#A077DE]/50 opacity-50 shadow-[0px_0px_30px_#A077DE]"></div>
          <img
            src="/images/nodes/sigil/alliance-1.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <p className="mt-9 text-[20px] font-medium leading-[1.5]">Alliance 1</p>
        <div className="mt-6 ">
          <p className="text-[14px] font-medium leading-[17px] text-light">Alias</p>
          <p className="mt-1 text-[18px] font-bold leading-[1.22]">The Almighty Myrian</p>
        </div>
        <div className="mt-6 ">
          <p className="text-[14px] font-medium leading-[17px] text-light">Credits</p>
          <p className="mt-1 text-[18px] font-bold leading-[1.22]">15</p>
        </div>
        <div className="mt-6 ">
          <p className="text-[14px] font-medium leading-[17px] text-light">Date Registered</p>
          <p className="mt-1 text-[18px] font-bold leading-[1.22]">24 Feb 2022</p>
        </div>
      </div>
    </div>
  );
};

export default AllianceInfo;
