import React from 'react';

interface Props {
  size: number;
  className: string;
}

export default function CircleKeyIcon({ className, size = 16 }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V5.99967C14.6663 2.66634 13.333 1.33301 9.99967 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8531 9.07375C10.0998 9.82708 9.01981 10.0604 8.06647 9.76042L6.33981 11.4804C6.21981 11.6071 5.97314 11.6871 5.79314 11.6604L4.99314 11.5537C4.72647 11.5204 4.48647 11.2671 4.44647 11.0071L4.33981 10.2071C4.31314 10.0337 4.39981 9.78708 4.51981 9.66042L6.23981 7.94042C5.94647 6.98708 6.17314 5.90708 6.92647 5.15375C8.00647 4.07375 9.76647 4.07375 10.8531 5.15375C11.9331 6.22708 11.9331 7.98708 10.8531 9.07375Z"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.96706 10.8536L6.40039 10.2803"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.92928 7.13314H8.93527"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
