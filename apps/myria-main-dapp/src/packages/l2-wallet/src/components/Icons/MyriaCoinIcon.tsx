import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function MyriaCoinIcon({
  size = 32,
  className = 'text-black',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#777777" fillOpacity="0.2" />
        <path
          d="M24.1189 16.0001C23.8545 16.0001 23.5927 15.9483 23.3485 15.8478C23.1042 15.7473 22.8823 15.5999 22.6953 15.4142C22.5084 15.2285 22.3601 15.008 22.2589 14.7654C22.1578 14.5227 22.1057 14.2626 22.1057 14C22.1057 13.4695 21.8936 12.9608 21.5161 12.5858C21.1385 12.2107 20.6264 12 20.0925 12C19.5586 12 19.0465 12.2107 18.669 12.5858C18.2914 12.9608 18.0793 13.4695 18.0793 14C18.0793 14.5304 17.8672 15.0391 17.4897 15.4142C17.1121 15.7892 16.6 15.9999 16.0661 15.9999C15.5322 15.9999 15.0201 15.7892 14.6426 15.4142C14.265 15.0391 14.0529 14.5304 14.0529 14C14.0493 13.4719 13.8356 12.9666 13.4584 12.5945C13.0813 12.2223 12.5712 12.0135 12.0397 12.0135C11.5081 12.0135 10.998 12.2223 10.6209 12.5945C10.2437 12.9666 10.03 13.4719 10.0264 14C10.0264 14.2626 9.97435 14.5227 9.87319 14.7654C9.77202 15.008 9.62373 15.2285 9.43678 15.4142C9.24984 15.5999 9.02791 15.7473 8.78365 15.8478C8.53939 15.9483 8.27759 16.0001 8.0132 16.0001C7.61503 16.0001 7.2258 16.1173 6.89473 16.3371C6.56366 16.5569 6.30562 16.8692 6.15325 17.2347C6.00087 17.6001 5.961 18.0022 6.03868 18.3902C6.11636 18.7782 6.3081 19.1345 6.58965 19.4142C6.87121 19.6939 7.22993 19.8844 7.62045 19.9616C8.01097 20.0387 8.41576 19.9991 8.78362 19.8478C9.15149 19.6964 9.46591 19.44 9.68712 19.1112C9.90833 18.7823 10.0264 18.3956 10.0264 18C10.03 17.4719 10.2437 16.9667 10.6209 16.5945C10.998 16.2224 11.5081 16.0135 12.0397 16.0135C12.5712 16.0135 13.0813 16.2224 13.4584 16.5945C13.8356 16.9667 14.0493 17.4719 14.0529 18C14.0529 18.5305 14.265 19.0392 14.6426 19.4142C15.0201 19.7893 15.5322 20 16.0661 20C16.6 20 17.1121 19.7893 17.4897 19.4142C17.8672 19.0392 18.0793 18.5305 18.0793 18C18.0793 17.4696 18.2914 16.9609 18.669 16.5858C19.0465 16.2108 19.5586 16.0001 20.0925 16.0001C20.6264 16.0001 21.1385 16.2108 21.5161 16.5858C21.8936 16.9609 22.1057 17.4696 22.1057 18C22.1057 18.3956 22.2238 18.7823 22.445 19.1112C22.6662 19.44 22.9806 19.6964 23.3485 19.8478C23.7164 19.9991 24.1212 20.0387 24.5117 19.9616C24.9022 19.8844 25.2609 19.6939 25.5425 19.4142C25.824 19.1345 26.0158 18.7782 26.0934 18.3902C26.1711 18.0022 26.1313 17.6001 25.9789 17.2347C25.8265 16.8692 25.5685 16.5569 25.2374 16.3371C24.9063 16.1173 24.5171 16.0001 24.1189 16.0001Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

MyriaCoinIcon.defaultProps = {
  size: 32,
  className: 'text-black',
};
