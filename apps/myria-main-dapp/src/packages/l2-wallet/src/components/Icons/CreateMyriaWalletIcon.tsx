import React from 'react';

interface CreateMyriaWalletIconProps {
  className: string;
  size: number;
}

export default function CreateMyriaWalletIcon({
  className = 'text-[#9AC9E3]',
  size = 64,
}: CreateMyriaWalletIconProps) {
  return (
    <div className={className}>
      <svg
        width={size}
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5066 20.8265C15.8666 20.8265 15.28 20.5332 14.88 19.9999C14.4266 19.3865 14.3733 18.5865 14.72 17.9198C15.1733 17.0131 15.8133 16.1332 16.64 15.3332L25.3066 6.63984C29.7333 2.23984 36.9333 2.23984 41.36 6.63984L46.0266 11.3866C48 13.3333 49.2 15.9466 49.3333 18.7199C49.36 19.3333 49.12 19.9199 48.6666 20.3199C48.2133 20.7199 47.6 20.9065 47.0133 20.7998C46.48 20.7198 45.92 20.6932 45.3333 20.6932H18.6666C18.0266 20.6932 17.4133 20.7465 16.8 20.8265C16.72 20.8265 16.6133 20.8265 16.5066 20.8265ZM20.96 16.6665H44.8533C44.5066 15.7599 43.9466 14.9332 43.2 14.1866L38.5066 9.43981C35.6533 6.61314 30.9866 6.61314 28.1066 9.43981L20.96 16.6665Z"
          fill="currentColor"
        />
        <path
          d="M13.3332 63.3333C8.9065 63.3333 4.7465 60.9867 2.5065 57.1733C1.3065 55.2533 0.666504 52.9867 0.666504 50.6667C0.666504 43.68 6.3465 38 13.3332 38C20.3198 38 25.9998 43.68 25.9998 50.6667C25.9998 52.9867 25.3598 55.2534 24.1598 57.2C21.9198 60.9867 17.7598 63.3333 13.3332 63.3333ZM13.3332 42C8.55984 42 4.6665 45.8933 4.6665 50.6667C4.6665 52.24 5.09317 53.7866 5.91984 55.12C7.49317 57.7866 10.2665 59.3333 13.3332 59.3333C16.3998 59.3333 19.1732 57.76 20.7465 55.1466C21.5732 53.7866 21.9998 52.2667 21.9998 50.6667C21.9998 45.8933 18.1065 42 13.3332 42Z"
          fill="currentColor"
        />
        <path
          d="M17.306 52.6133H9.35938C8.26604 52.6133 7.35938 51.7066 7.35938 50.6133C7.35938 49.5199 8.26604 48.6133 9.35938 48.6133H17.3327C18.426 48.6133 19.3327 49.5199 19.3327 50.6133C19.3327 51.7066 18.426 52.6133 17.306 52.6133Z"
          fill="currentColor"
        />
        <path
          d="M13.3335 56.693C12.2402 56.693 11.3335 55.7864 11.3335 54.693V46.7197C11.3335 45.6264 12.2402 44.7197 13.3335 44.7197C14.4268 44.7197 15.3335 45.6264 15.3335 46.7197V54.693C15.3335 55.813 14.4268 56.693 13.3335 56.693Z"
          fill="currentColor"
        />
        <path
          d="M45.3331 60.667H20.3465C19.4931 60.667 18.7465 60.1337 18.4531 59.3604C18.1598 58.5604 18.3998 57.6803 19.0398 57.147C19.6798 56.6136 20.2665 55.9203 20.6931 55.1737C21.5465 53.8137 21.9731 52.267 21.9731 50.6937C21.9731 45.9204 18.0798 42.027 13.3065 42.027C10.8265 42.027 8.45312 43.0936 6.79978 44.987C6.23978 45.6003 5.35979 45.8404 4.58645 45.547C3.81312 45.2537 3.27979 44.507 3.27979 43.6803V32.0003C3.27979 23.787 8.34645 17.8403 16.2131 16.8537C16.9331 16.747 17.7598 16.667 18.6131 16.667H45.2798C45.9198 16.667 46.7465 16.6937 47.5998 16.827C55.4664 17.7337 60.6131 23.707 60.6131 32.0003V45.3337C60.6664 54.507 54.5065 60.667 45.3331 60.667ZM24.4798 56.667H45.3331C52.2131 56.667 56.6665 52.2137 56.6665 45.3337V32.0003C56.6665 25.7603 53.0131 21.4669 47.0931 20.7736C46.4531 20.6669 45.8931 20.667 45.3331 20.667H18.6665C18.0265 20.667 17.4131 20.7203 16.7998 20.8003C10.9331 21.547 7.33312 25.8137 7.33312 32.0003V39.5203C9.14645 38.5337 11.2265 38.0003 13.3331 38.0003C20.3198 38.0003 25.9998 43.6803 25.9998 50.667C25.9998 52.7737 25.4665 54.8537 24.4798 56.667Z"
          fill="currentColor"
        />
        <path
          d="M58.6668 45.9997H50.6668C46.6135 45.9997 43.3335 42.7197 43.3335 38.6663C43.3335 34.613 46.6135 31.333 50.6668 31.333H58.6668C59.7602 31.333 60.6668 32.2397 60.6668 33.333C60.6668 34.4263 59.7602 35.333 58.6668 35.333H50.6668C48.8268 35.333 47.3335 36.8263 47.3335 38.6663C47.3335 40.5063 48.8268 41.9997 50.6668 41.9997H58.6668C59.7602 41.9997 60.6668 42.9063 60.6668 43.9997C60.6668 45.093 59.7602 45.9997 58.6668 45.9997Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
