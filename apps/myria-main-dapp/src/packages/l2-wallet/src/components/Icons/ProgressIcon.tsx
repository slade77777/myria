import React from 'react';

type Props = {
  className?: string;
  size?: number;
  isNotAnimate?: Boolean;
};

export default function ProgressIcon({
  size = 64,
  className = 'text-[#777777]',
  isNotAnimate = false,
}: Props) {
  return (
    <div className={className}>
      <svg
        className={isNotAnimate ? '' : 'animate-spin'}
        width={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M58.6667 32.0007C58.6667 46.7207 46.72 58.6673 32 58.6673C17.28 58.6673 8.29337 43.8407 8.29337 43.8407M8.29337 43.8407H20.3467M8.29337 43.8407V57.174M5.33337 32.0007C5.33337 17.2807 17.1734 5.33398 32 5.33398C49.7867 5.33398 58.6667 20.1607 58.6667 20.1607M58.6667 20.1607V6.82732M58.6667 20.1607H46.8267"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

ProgressIcon.defaultProps = {
  size: 24,
  className: 'text-[#777777]',
  isNotAnimate: false,
};
