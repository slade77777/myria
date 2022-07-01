import { Trans } from '@lingui/macro';
import React from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

/**
 * Mocking UI
 */

function SortBy() {
  return (
    <div className="flex h-[32px] cursor-pointer items-center justify-between rounded-[4px] bg-brand-dark-blue px-4 text-white">
      <span className="text-[14px] font-bold uppercase">
        <Trans>Sort By</Trans>
      </span>
      <i className="w-[24px]">
        <ChevronDownIcon />
      </i>
    </div>
  );
}

export default SortBy;
