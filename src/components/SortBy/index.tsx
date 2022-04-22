import React from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

/**
 * Mocking UI
 */

function SortBy() {
  return (
    <div className='h-[32px] flex items-center justify-between px-4 bg-brand-dark-blue rounded-[4px] text-white cursor-pointer'>
      <span className="uppercase text-[14px] font-bold">Sort By</span>
      <i className="w-[24px]">
        <ChevronDownIcon />
      </i>
    </div>
  );
}

export default SortBy;
