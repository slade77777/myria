import React from 'react';

type Props = {
  className?: string;
  size: number;
  direction: 'top' | 'bottom' | 'left' | 'right' | '45' | '-45' | '135' | '225';
};

export default function Arrow3Icon({
  className = 'text-[#9AC9E3]',
  size = 16,
  direction = 'top',
}: Props) {
  let deg = 0;
  switch (direction) {
    case 'left':
      deg = 90;
      break;
    case 'top':
      deg = 180;
      break;
    case 'right':
      deg = 270;
      break;
    default:
      break;
  }

  deg = parseInt(direction.toString(), 10);

  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 64 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${deg}deg)` }}
      >
        <path
          d="M45.3332 18.6704L18.6665 45.3371"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42.6665 45.3374H18.6665L18.6665 21.3374"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

Arrow3Icon.defaultProps = {
  className: 'text-white',
};
