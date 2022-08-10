import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function ProgressHistoryIcon({
  size = 14,
  className = '',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6668 8.0026C14.6668 11.6826 11.6802 14.6693 8.00016 14.6693C4.32016 14.6693 2.0735 10.9626 2.0735 10.9626M2.0735 10.9626H5.08683M2.0735 10.9626V14.2959M1.3335 8.0026C1.3335 4.3226 4.2935 1.33594 8.00016 1.33594C12.4468 1.33594 14.6668 5.0426 14.6668 5.0426M14.6668 5.0426V1.70927M14.6668 5.0426H11.7068"
          stroke="#A1AFBA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

ProgressHistoryIcon.defaultProps = {
  size: 14,
  className: 'text-[#777777]',
};
