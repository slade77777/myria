import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function BridgeIcon({
  size = 16,
  className = 'text-white',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.4668 6.17285L8.00012 8.21952L11.5068 6.18618"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.8462V8.21289"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.1735 4.19291L5.04016 5.37958C4.56016 5.64624 4.16016 6.31958 4.16016 6.87291V9.13291C4.16016 9.68624 4.55349 10.3596 5.04016 10.6262L7.1735 11.8129C7.62684 12.0662 8.3735 12.0662 8.8335 11.8129L10.9668 10.6262C11.4468 10.3596 11.8468 9.68624 11.8468 9.13291V6.86625C11.8468 6.31291 11.4535 5.63958 10.9668 5.37291L8.8335 4.18624C8.3735 3.93291 7.62684 3.93291 7.1735 4.19291Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6667 10C14.6667 12.58 12.58 14.6667 10 14.6667L10.7 13.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33301 5.99967C1.33301 3.41967 3.41967 1.33301 5.99967 1.33301L5.29968 2.49967"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
