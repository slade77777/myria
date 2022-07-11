import React from 'react';

interface TProps {
  label?: string;
}

export default function Toggle({ label }: TProps) {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only" />
          <div className="block bg-gray1 w-14 h-8 rounded-full" />
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
        </div>
        <div className="ml-3 text-gray1 font-medium">{label}</div>
      </label>
    </div>
  );
}

Toggle.defaultProps = {
  label: '',
};
