import React from 'react';

type Props = {
  size: number;
  className: string;
};

export default function DiscordGameIcon({
  size = 28,
  className = 'text-black',
}: Props) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10.5"
          cy="13.9999"
          r="1.16667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="17.5"
          cy="13.9999"
          rx="1.16667"
          ry="1.16667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 8.75008C12.8333 7.58341 15.1667 7.58341 19.25 8.75008"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.16669 19.2501C12.25 20.4167 15.75 20.4167 19.8334 19.2501"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.0833 19.8334C18.0833 21.0001 19.8333 23.3334 20.4166 23.3334C22.1666 23.3334 23.7218 21.3886 24.5 19.8334C25.2781 17.8886 25.0833 13.0282 22.75 6.41675C21.0501 5.23258 19.25 4.85341 17.5 4.66675L16.3333 7.58341"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.91667 19.8334C9.91667 21.0001 8.33467 23.3334 7.77934 23.3334C6.11217 23.3334 4.63167 21.3886 3.89084 19.8334C3.15001 17.8886 3.33551 13.0282 5.55684 6.41675C7.17617 5.23258 8.80251 4.85341 10.5 4.66675L11.6667 7.58341"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
