import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function DropdownArrowIcon({
  className = 'text-[#97AAB5]',
  size = 10,
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9465 0.453125H4.79316H1.05317C0.413166 0.453125 0.0931657 1.22646 0.546499 1.67979L3.99983 5.13312C4.55317 5.68646 5.45317 5.68646 6.0065 5.13312L7.31983 3.81979L9.45983 1.67979C9.9065 1.22646 9.5865 0.453125 8.9465 0.453125Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
