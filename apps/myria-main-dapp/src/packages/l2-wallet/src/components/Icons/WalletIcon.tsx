import React from 'react';

type Props = {
  className?: string;
  size: number;
};

export default function WalletIcon({ size, className }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size + 1}
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.667 15.0518H11.667"
          stroke="#9AC9E3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.6667 18.3347V21.7681C36.6667 22.6848 35.9334 23.4347 35 23.4681H31.7333C29.9333 23.4681 28.2834 22.1514 28.1334 20.3514C28.0334 19.3014 28.4333 18.3181 29.1333 17.6347C29.75 17.0014 30.6 16.6348 31.5333 16.6348H35C35.9334 16.6681 36.6667 17.418 36.6667 18.3347Z"
          stroke="#9AC9E3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.133 17.6347C28.433 18.3181 28.033 19.3014 28.133 20.3514C28.283 22.1514 29.933 23.4681 31.733 23.4681H34.9997V25.8848C34.9997 30.8848 31.6663 34.2181 26.6663 34.2181H11.6663C6.66634 34.2181 3.33301 30.8848 3.33301 25.8848V14.2181C3.33301 9.68477 6.06635 6.51809 10.3163 5.98476C10.7497 5.91809 11.1997 5.88477 11.6663 5.88477H26.6663C27.0997 5.88477 27.5163 5.90141 27.9163 5.96808C32.2163 6.46808 34.9997 9.65143 34.9997 14.2181V16.6348H31.533C30.5996 16.6348 29.7496 17.0014 29.133 17.6347Z"
          stroke="#9AC9E3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

WalletIcon.defaultProps = {
  size: 24,
  className: 'text-[#292D32]',
};
