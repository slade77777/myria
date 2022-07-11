import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function MediumIcon({
  size = 24,
  className = 'text-[#929292]',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1837_1539)">
          <path
            d="M12.9222 12.2296C12.9222 15.4112 10.3652 17.9903 7.21121 17.9903C4.05718 17.9903 1.5 15.4106 1.5 12.2296C1.5 9.04866 4.05698 6.46875 7.21121 6.46875C10.3654 6.46875 12.9222 9.04808 12.9222 12.2296Z"
            fill="currentColor"
          />
          <path
            d="M19.1873 12.2301C19.1873 15.2248 17.9089 17.6535 16.3317 17.6535C14.7546 17.6535 13.4761 15.2248 13.4761 12.2301C13.4761 9.23532 14.7544 6.80664 16.3315 6.80664C17.9087 6.80664 19.1872 9.23454 19.1872 12.2301"
            fill="currentColor"
          />
          <path
            d="M21.75 12.2296C21.75 14.9122 21.3004 17.0881 20.7456 17.0881C20.1909 17.0881 19.7415 14.9128 19.7415 12.2296C19.7415 9.54649 20.1911 7.37109 20.7456 7.37109C21.3002 7.37109 21.75 9.54629 21.75 12.2296Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1837_1539">
            <rect
              width="20.25"
              height="20.25"
              fill="currentColor"
              transform="translate(1.5 2.25)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

MediumIcon.defaultProps = {
  size: 24,
  className: 'text-[#929292]'
}