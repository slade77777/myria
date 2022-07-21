import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function InfoCircle2Icon({
  size = 16,
  color = '#9AC9E3',
  className,
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00004 1.33398C4.32671 1.33398 1.33337 4.32732 1.33337 8.00065C1.33337 11.674 4.32671 14.6673 8.00004 14.6673C11.6734 14.6673 14.6667 11.674 14.6667 8.00065C14.6667 4.32732 11.6734 1.33398 8.00004 1.33398ZM7.50004 5.33398C7.50004 5.06065 7.72671 4.83398 8.00004 4.83398C8.27337 4.83398 8.50004 5.06065 8.50004 5.33398V8.66732C8.50004 8.94065 8.27337 9.16732 8.00004 9.16732C7.72671 9.16732 7.50004 8.94065 7.50004 8.66732V5.33398ZM8.61337 10.9207C8.58004 11.0073 8.53337 11.074 8.47337 11.1407C8.40671 11.2007 8.33337 11.2473 8.25337 11.2807C8.17337 11.314 8.08671 11.334 8.00004 11.334C7.91337 11.334 7.82671 11.314 7.74671 11.2807C7.66671 11.2473 7.59337 11.2007 7.52671 11.1407C7.46671 11.074 7.42004 11.0073 7.38671 10.9207C7.35337 10.8407 7.33337 10.754 7.33337 10.6673C7.33337 10.5807 7.35337 10.494 7.38671 10.414C7.42004 10.334 7.46671 10.2607 7.52671 10.194C7.59337 10.134 7.66671 10.0873 7.74671 10.054C7.90671 9.98732 8.09337 9.98732 8.25337 10.054C8.33337 10.0873 8.40671 10.134 8.47337 10.194C8.53337 10.2607 8.58004 10.334 8.61337 10.414C8.64671 10.494 8.66671 10.5807 8.66671 10.6673C8.66671 10.754 8.64671 10.8407 8.61337 10.9207Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

InfoCircle2Icon.defaultProps = {
  size: 16,
  className: 'text-[#777777]',
};
