import React from 'react';

const AllianceInfo: React.FC = () => {
  return (
    <div className="sigil-panel flex h-[441px] flex-col items-center px-4 pt-[37px] pb-[30px] text-center">
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
  );
};

export default AllianceInfo;
