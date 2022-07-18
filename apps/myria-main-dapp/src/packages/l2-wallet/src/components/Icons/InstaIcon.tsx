import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function InstagramIcon({
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
        <path
          d="M11.995 20.4627C9.53637 20.4627 9.24653 20.4501 8.28706 20.4094C7.53885 20.3856 6.80032 20.2382 6.10328 19.9737C4.89726 19.5191 3.94362 18.5949 3.47474 17.4264C3.21219 16.7486 3.07058 16.0326 3.05597 15.3089C3 14.3813 3 14.0773 3 11.7139C3 9.32533 3.01299 9.04648 3.05597 8.12184C3.0709 7.39909 3.2125 6.68405 3.47474 6.00727C3.94311 4.83721 4.8983 3.91222 6.10627 3.45893C6.80453 3.20352 7.54282 3.06598 8.28906 3.05228C9.24353 3 9.55736 3 11.995 3C14.4736 3 14.7585 3.01259 15.7029 3.05228C16.4511 3.0661 17.1914 3.20362 17.8917 3.45893C19.0994 3.91274 20.0544 4.83755 20.5233 6.00727C20.7902 6.69392 20.9326 7.42013 20.944 8.15379C21 9.08134 21 9.38439 21 11.7468C21 14.1093 20.986 14.4191 20.944 15.336C20.9292 16.0604 20.7872 16.7771 20.5243 17.4554C20.0542 18.6247 19.0991 19.5492 17.8917 20.0037C17.1924 20.2576 16.4536 20.3948 15.7069 20.4094C14.7525 20.4627 14.4396 20.4627 11.995 20.4627ZM11.961 4.53268C9.51638 4.53268 9.26252 4.5443 8.30805 4.58593C7.73835 4.59324 7.17416 4.69509 6.63998 4.88705C5.85117 5.17945 5.22699 5.78167 4.92193 6.54462C4.72226 7.06775 4.61711 7.62029 4.6111 8.178C4.55813 9.1162 4.55813 9.36212 4.55813 11.7139C4.55813 14.0376 4.56713 14.3194 4.6111 15.2518C4.62005 15.8038 4.72514 16.3505 4.92193 16.8687C5.22744 17.6311 5.85151 18.2329 6.63998 18.5253C7.1738 18.7185 7.73822 18.8204 8.30805 18.8264C9.27551 18.8806 9.53037 18.8806 11.961 18.8806C14.4127 18.8806 14.6665 18.869 15.613 18.8264C16.1831 18.8197 16.7477 18.7178 17.2821 18.5253C18.0661 18.2303 18.6862 17.63 18.9911 16.8706C19.1904 16.347 19.2955 15.7943 19.3019 15.2363H19.3129C19.3559 14.3107 19.3559 14.0638 19.3559 11.6984C19.3559 9.33308 19.3449 9.08424 19.3019 8.1596C19.293 7.60816 19.1879 7.06214 18.9911 6.54462C18.6869 5.78416 18.0667 5.18263 17.2821 4.88705C16.7478 4.69412 16.1831 4.59225 15.613 4.58593C14.6465 4.53268 14.3937 4.53268 11.961 4.53268ZM11.995 16.1861C10.126 16.1873 8.4404 15.0976 7.72424 13.4252C7.00808 11.7528 7.40246 9.82718 8.72345 8.54636C10.0444 7.26555 12.0318 6.88182 13.7588 7.57415C15.4857 8.26649 16.612 9.8985 16.6124 11.7091C16.6097 14.179 14.5446 16.1813 11.995 16.1861ZM11.995 8.80249C10.3391 8.80249 8.99667 10.1029 8.99667 11.7071C8.99667 13.3113 10.3391 14.6118 11.995 14.6118C13.6509 14.6118 14.9933 13.3113 14.9933 11.7071C14.9895 10.1045 13.6493 8.80622 11.995 8.80249ZM16.7923 8.11216C16.1981 8.11002 15.7178 7.64218 15.7189 7.0665C15.72 6.49082 16.2021 6.0247 16.7963 6.0247C17.3906 6.0247 17.8726 6.49081 17.8737 7.06649C17.874 7.34423 17.7601 7.61065 17.5572 7.80686C17.3543 8.00307 17.079 8.11293 16.7923 8.11216Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

InstagramIcon.defaultProps = {
  size: 24,
  className: 'text-[#929292]',
};
