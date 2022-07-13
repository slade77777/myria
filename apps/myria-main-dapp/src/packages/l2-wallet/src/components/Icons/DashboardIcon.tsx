import React from 'react';

interface TProps {
  size: number;
  className: string;
}

export default function DashboardIcon({ size = 16, className }: TProps) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8.83398"
          y="2.66699"
          width="5"
          height="6.33333"
          rx="1.5"
          stroke="white"
        />
        <rect
          x="2.16699"
          y="8"
          width="5"
          height="6.33333"
          rx="1.5"
          stroke="white"
        />
        <rect
          x="8.83398"
          y="10.667"
          width="5"
          height="3.66667"
          rx="1.5"
          stroke="white"
        />
        <rect
          x="2.16699"
          y="2.66699"
          width="5"
          height="3.66667"
          rx="1.5"
          stroke="white"
        />
      </svg>
    </div>
  );
}
