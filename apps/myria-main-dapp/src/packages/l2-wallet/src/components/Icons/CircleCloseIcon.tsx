import React from 'react';

type Props = {
  className?: string;
  size?: number;
  border?: number;
};

export default function CircleCloseIcon({
  className = 'text-[#F37272]',
  size = 64,
  border = 2,
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 64 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.0002 58.6693C46.6668 58.6693 58.6668 46.6693 58.6668 32.0026C58.6668 17.3359 46.6668 5.33594 32.0002 5.33594C17.3335 5.33594 5.3335 17.3359 5.3335 32.0026C5.3335 46.6693 17.3335 58.6693 32.0002 58.6693Z"
          stroke="currentColor"
          strokeWidth={`${border}`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.5131 40.6103L25.507 40.6164L25.5011 40.6227C25.2375 40.9051 24.8453 41.0505 24.4533 41.0505C24.0721 41.0505 23.6948 40.9116 23.3935 40.6103L23.0419 40.9619L23.3935 40.6103C22.8154 40.0322 22.8154 39.0688 23.3935 38.4908L38.4868 23.3974C39.0649 22.8193 40.0283 22.8193 40.6064 23.3974C41.1845 23.9755 41.1845 24.9389 40.6064 25.517L25.5131 40.6103Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path
          d="M39.5466 41.0505C39.1654 41.0505 38.7881 40.9116 38.4869 40.6103L23.3935 25.517C22.8154 24.9389 22.8154 23.9755 23.3935 23.3974C23.9716 22.8193 24.935 22.8193 25.5131 23.3974L40.6064 38.4908C41.1845 39.0688 41.1845 40.0322 40.6064 40.6103C40.3051 40.9116 39.9278 41.0505 39.5466 41.0505Z"
          fill="currentColor"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

CircleCloseIcon.defaultProps = {
  className: 'text-[#F37272]',
  size: 64,
};
