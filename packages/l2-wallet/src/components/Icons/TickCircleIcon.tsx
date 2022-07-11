import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function TickCircleIcon({
  size = 64,
  className = 'text-[#292D32]',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 58.6673C46.6667 58.6673 58.6667 46.6673 58.6667 32.0007C58.6667 17.334 46.6667 5.33398 32 5.33398C17.3334 5.33398 5.33337 17.334 5.33337 32.0007C5.33337 46.6673 17.3334 58.6673 32 58.6673Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.6666 31.9998L28.2133 39.5465L43.3333 24.4531"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

TickCircleIcon.defaultProps = {
  size: 64,
  className: 'text-[#292D32]'
}