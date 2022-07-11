import React from 'react';

export default function Home() {
  return (
    <div className="mt-[43px]">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <div className="bg-[#E5E5E5] h-[224px] w-full col-span-2 rounded-[12px] text-[14px] text-[#5C5C5C] flex justify-center items-center">
          Earnings and Rewards Data
        </div>
        <div className="bg-[#E5E5E5] h-[224px] w-full rounded-[12px] text-[14px] text-[#5C5C5C] flex justify-center items-center">
          Wallet
        </div>
        <div className="bg-[#E5E5E5] h-[224px] w-full rounded-[12px] text-[14px] text-[#5C5C5C] flex justify-center items-center">
          Node Rewards
        </div>
        <div className="bg-[#E5E5E5] h-[224px] w-full rounded-[12px] text-[14px] text-[#5C5C5C] flex justify-center items-center text-center">
          Store preview <br />
          (items available for purchase)
        </div>
        <div className="bg-[#E5E5E5] h-[224px] w-full rounded-[12px] text-[14px] text-[#5C5C5C] flex justify-center items-center text-center">
          Recent Transactions
        </div>
      </div>
    </div>
  );
}
