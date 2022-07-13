import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function StakingIcon({
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
          d="M5.33301 7.5998C5.33301 8.11314 5.73301 8.53314 6.21967 8.53314H7.21967C7.64634 8.53314 7.99301 8.16647 7.99301 7.71981C7.99301 7.23314 7.77967 7.05981 7.46634 6.94647L5.86634 6.38647C5.54634 6.27314 5.33301 6.09981 5.33301 5.61314C5.33301 5.16647 5.67967 4.7998 6.10634 4.7998H7.10634C7.59967 4.80647 7.99967 5.21981 7.99967 5.73314"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 8.56641V9.05974"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 4.27344V4.79344"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.65967 11.9863C9.60151 11.9863 11.9863 9.60151 11.9863 6.65967C11.9863 3.71784 9.60151 1.33301 6.65967 1.33301C3.71784 1.33301 1.33301 3.71784 1.33301 6.65967C1.33301 9.60151 3.71784 11.9863 6.65967 11.9863Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.65332 13.2537C9.25332 14.1003 10.2333 14.6537 11.3533 14.6537C13.1733 14.6537 14.6533 13.1737 14.6533 11.3537C14.6533 10.247 14.1067 9.26699 13.2733 8.66699"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
