import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function MarketPlaseIcon({
  size = 24,
  className = 'text-light-blue',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.81043 2L5.19043 5.63"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.1904 2L18.8104 5.63"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7.84998C2 5.99998 2.99 5.84998 4.22 5.84998H19.78C21.01 5.84998 22 5.99998 22 7.84998C22 9.99998 21.01 9.84998 19.78 9.84998H4.22C2.99 9.84998 2 9.99998 2 7.84998Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4.91016 18.64C5.23016 20.58 6.00016 22 8.86016 22H14.8902C18.0002 22 18.4602 20.64 18.8202 18.76L20.5002 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3.5 10L4.19 14.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
