import React from 'react';

const TimeOnline: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 rounded-xl bg-brand-deep-blue p-6 text-center shadow-dark-panel md:justify-between md:p-8 md:text-left">
      <div>
        <p className="text-[20px] font-medium leading-[1.25] text-light">Current Node Cycle</p>
        <p className="mt-4 text-[32px] font-extrabold leading-[1.15] md:text-[40px]">23:21</p>
      </div>
      <div>
        <p className="text-[20px] font-medium leading-[1.25] text-light">Time Online</p>
        <p className="mt-4 text-[32px] font-extrabold leading-[1.15] md:text-[40px]">03:29</p>
      </div>
    </div>
  );
};

export default TimeOnline;
