import React from 'react';

interface TProps {
  label?: string;
}

export default function Toggle({ label }: TProps) {
  return (
    <div className="mb-12 flex w-full items-center justify-center">
      <label htmlFor="toggleB" className="flex cursor-pointer items-center">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only" />
          <div className="block h-8 w-14 rounded-full bg-gray1" />
          <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition" />
        </div>
        <div className="ml-3 font-medium text-gray1">{label}</div>
      </label>
    </div>
  );
}

Toggle.defaultProps = {
  label: '',
};
