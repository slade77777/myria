import React from 'react';

type Props = {
    className?: string;
    size?: number;
  };

export default function TriangularIcon({
  className = 'text-[#737373]',
  size = 16
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 8L16 -9.53674e-07L2.54292e-07 4.4509e-07L8 8Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

TriangularIcon.defaultProps = {
  size: 16,
  className: 'text-[#737373]'
}