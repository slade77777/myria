import React from 'react';

type Props = {
  className?: string;
  size: number;
  direction: 'top' | 'bottom' | 'left' | 'right' | '45' | '-45' | '135' | '225'
};

export default function Arrow2Icon({ className = 'text-white', size = 16, direction = 'top' }: Props) {
  let deg = 0;
  switch(direction) {
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
      deg = parseInt(direction);
      break;
  }

  return (
    <div className={className}>
      <svg
        style={{transform: `rotate(${deg}deg)`}}
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0467 9.61914L8.00004 13.6658L3.95337 9.61914"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 2.33398V13.554"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

Arrow2Icon.defaultProps = {
  className: 'text-white'
}