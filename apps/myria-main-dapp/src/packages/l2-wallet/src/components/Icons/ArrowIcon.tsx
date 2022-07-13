import React from 'react';

type Props = {
  className?: string;
  size?: string;
  direction?: string;
};

export default function ArrowIcon({
  className,
  size,
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

  return (
    <div className={className}>
      <svg
        style={{ transform: `rotate(${deg}deg)` }}
        width={size}
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.418792 0.572636C-0.139598 1.13102 -0.139598 2.03304 0.418792 2.59143L6.9906 9.16324C7.54899 9.72163 8.45101 9.72163 9.0094 9.16324L15.5812 2.59143C16.1396 2.03304 16.1396 1.13102 15.5812 0.572635C15.0228 0.0142453 14.1208 0.0142454 13.5624 0.572635L7.99284 6.12789L2.43758 0.572636C1.87919 0.0142459 0.962863 0.0285635 0.418792 0.572636Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
      </svg>
    </div>
  );
}

ArrowIcon.defaultProps = {
  size: 24,
  className: 'text-white',
  direction: 'top',
};
