import React from 'react';

type Props = {
  size?: number;
  className?: string;
};

export default function EmailIcon({ size = 48, className }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 36H10C7.79086 36 6 34.2091 6 32V12C6 9.79086 7.79086 8 10 8H38C40.2091 8 42 9.79086 42 12V27"
          stroke="#9AC9E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12L24 24L42 12"
          stroke="#9AC9E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 36H42"
          stroke="#9AC9E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 30L42 36L36 42"
          stroke="#9AC9E3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
