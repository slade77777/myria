import React from 'react';

type Props = {
  className: string;
  size: number;
};

export default function CheckIcon({ className, size = 24 }: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM17.0303 9.53033C17.3232 9.23744 17.3232 8.76256 17.0303 8.46967C16.7374 8.17678 16.2626 8.17678 15.9697 8.46967L10.5 13.9393L8.03033 11.4697C7.73744 11.1768 7.26256 11.1768 6.96967 11.4697C6.67678 11.7626 6.67678 12.2374 6.96967 12.5303L9.61612 15.1768C10.1043 15.6649 10.8957 15.6649 11.3839 15.1768L17.0303 9.53033Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
