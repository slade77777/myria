import React from 'react';

type Props = {
  className: string;
  size: number;
};

export default function CheckIconFull({ className, size = 24 }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22Z"
          fill="#050E15"
        />
        <path
          d="M32 15.333L19.0202 28.3128C18.825 28.508 18.5084 28.508 18.3131 28.3128L12 21.9997"
          stroke="#9ECEAB"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
