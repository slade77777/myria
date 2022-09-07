import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';

const tree = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 22.562V29.375C31.977 29.463 31.953 29.551 31.931 29.64C31.819 30.1544 31.5732 30.63 31.2183 31.0188C30.8634 31.4076 30.412 31.6957 29.91 31.854C29.736 31.915 29.554 31.954 29.375 32H22.625C22.557 31.979 22.489 31.953 22.42 31.939C21.7489 31.8098 21.1428 31.4536 20.7034 30.9302C20.264 30.4069 20.0181 29.7483 20.007 29.065C19.9897 27.0137 19.9897 24.962 20.007 22.91C20.0163 22.2263 20.2648 21.5675 20.7095 21.0481C21.1542 20.5287 21.7669 20.1815 22.441 20.067C22.9992 20.007 23.5608 19.9843 24.122 19.999C24.409 19.992 24.696 19.999 25 19.999C25 19.699 25 19.435 25 19.176C25 18.371 24.625 17.999 23.81 17.999H15.562C13.0727 17.999 10.5836 17.999 8.09497 17.999C7.84869 17.9714 7.60118 18.0388 7.40289 18.1874C7.20461 18.3361 7.07054 18.5549 7.02802 18.799C6.99968 19.1984 6.99633 19.5992 7.01801 19.999C7.71801 19.999 8.39 19.987 9.065 19.999C9.83991 20.0107 10.5796 20.3244 11.1267 20.8733C11.6738 21.4222 11.985 22.163 11.994 22.938C12.013 24.979 12.009 27.02 11.994 29.062C11.9851 29.6712 11.7881 30.2628 11.4301 30.7557C11.0721 31.2487 10.5706 31.619 9.99402 31.816C9.79402 31.888 9.578 31.937 9.37 31.997H2.62C2.552 31.976 2.48498 31.951 2.41998 31.935C1.89792 31.834 1.41234 31.5953 1.01343 31.2437C0.614519 30.892 0.316782 30.4402 0.151001 29.935C0.092001 29.773 0.051 29.604 0 29.435V22.56C0.05 22.393 0.100024 22.225 0.150024 22.06C0.345118 21.4684 0.71951 20.9523 1.22125 20.5831C1.72299 20.214 2.32719 20.0102 2.95001 20C3.62301 19.989 4.29597 20 4.99597 20C4.99597 19.7 4.99597 19.446 4.99597 19.188C4.96907 18.7625 5.033 18.3362 5.18347 17.9373C5.33395 17.5384 5.56755 17.1761 5.86877 16.8744C6.17 16.5727 6.53195 16.3385 6.9306 16.1874C7.32925 16.0363 7.75551 15.9717 8.18103 15.998C10.3357 15.998 12.4904 15.998 14.645 15.998H14.972V11.998C14.293 11.998 13.638 12.005 12.983 11.998C12.1921 11.9964 11.4342 11.6815 10.8751 11.1222C10.316 10.5629 10.0013 9.80483 10 9.01401C9.985 6.99501 9.98 4.97499 10 2.95599C9.99278 2.42069 10.1363 1.89416 10.4141 1.43652C10.6919 0.97889 11.0928 0.608627 11.571 0.368011C11.8887 0.22026 12.2174 0.0972174 12.554 0H19.429C19.474 0.0227202 19.5208 0.0414583 19.569 0.0559998C20.2501 0.186719 20.8645 0.550789 21.3062 1.08557C21.7478 1.62035 21.9893 2.29239 21.989 2.98599C22 4.99499 22.007 7.004 21.979 9.013C21.9719 9.43861 21.8776 9.85824 21.702 10.246C21.4797 10.7677 21.1078 11.212 20.6334 11.5227C20.1589 11.8334 19.6031 11.9967 19.036 11.992C18.364 12.018 17.69 11.992 17.014 11.992V15.992H17.406C19.54 15.992 21.674 15.992 23.806 15.992C24.1179 15.9887 24.429 16.0223 24.733 16.092C25.3728 16.2489 25.9425 16.6136 26.3527 17.129C26.763 17.6444 26.9906 18.2813 27 18.94C27.008 19.289 27 19.64 27 20.001C27.728 20.001 28.4 19.978 29.079 20.001C29.6298 20.0039 30.1683 20.1641 30.631 20.4628C31.0938 20.7615 31.4615 21.1863 31.691 21.687C31.8129 21.9716 31.9161 22.2639 32 22.562V22.562ZM16.031 2C15.052 2 14.073 2 13.094 2C12.9477 1.98562 12.8001 2.00365 12.6616 2.05283C12.523 2.102 12.3971 2.18111 12.2926 2.28452C12.1881 2.38792 12.1078 2.51311 12.0572 2.65112C12.0066 2.78913 11.9871 2.93659 12 3.08301C12 5.03101 12 6.97866 12 8.92599C11.9888 9.07023 12.009 9.21518 12.0593 9.35083C12.1096 9.48648 12.1887 9.6096 12.2912 9.7117C12.3937 9.81381 12.5171 9.89246 12.653 9.94223C12.7888 9.992 12.9338 10.0117 13.078 10C15.026 10 16.9737 10 18.921 10C19.0652 10.0119 19.2102 9.99227 19.3461 9.94263C19.482 9.89298 19.6055 9.81444 19.7081 9.71243C19.8106 9.61042 19.8898 9.48738 19.9402 9.35178C19.9907 9.21617 20.011 9.07125 20 8.927C20 6.979 20 5.03135 20 3.08401C20.0131 2.93752 19.9936 2.78993 19.9431 2.65179C19.8926 2.51366 19.8123 2.38837 19.7078 2.28485C19.6033 2.18133 19.4773 2.10212 19.3387 2.05289C19.2001 2.00365 19.0524 1.98559 18.906 2C17.948 1.995 16.99 2 16.031 2ZM10 25.983C10 25.025 10 24.066 10 23.108C10.0174 22.9589 10.001 22.8078 9.95197 22.666C9.90298 22.5241 9.8227 22.395 9.71704 22.2884C9.61138 22.1818 9.48305 22.1003 9.34161 22.05C9.20018 21.9998 9.04927 21.982 8.90002 21.998C6.97336 21.998 5.04635 21.998 3.11902 21.998C2.96707 21.9784 2.81268 21.9941 2.66772 22.0436C2.52277 22.0932 2.39115 22.1755 2.28302 22.284C2.17489 22.3925 2.09307 22.5244 2.04401 22.6696C1.99494 22.8147 1.9799 22.9691 2 23.121C2 25.0376 2 26.9543 2 28.871C1.98141 29.0226 1.99738 29.1764 2.04669 29.3209C2.09601 29.4655 2.17737 29.597 2.28473 29.7056C2.39209 29.8142 2.52267 29.8971 2.66663 29.9481C2.81058 29.9991 2.96424 30.0168 3.11603 30C5.04336 30 6.97031 30 8.89697 30C9.04575 30.0146 9.19595 29.9959 9.33661 29.9453C9.47727 29.8947 9.60488 29.8134 9.71021 29.7073C9.81553 29.6012 9.89589 29.473 9.9455 29.332C9.9951 29.1909 10.0127 29.0407 9.99701 28.892C10 27.921 10 26.952 10 25.983ZM25.992 30C26.961 30 27.929 30 28.898 30C29.0469 30.0147 29.1972 29.996 29.3379 29.9453C29.4786 29.8946 29.6063 29.8132 29.7116 29.707C29.817 29.6008 29.8974 29.4724 29.9469 29.3313C29.9964 29.1902 30.0139 29.0397 29.998 28.891C29.998 26.9643 29.998 25.0373 29.998 23.11C30.0153 22.9611 29.9989 22.8102 29.9501 22.6685C29.9012 22.5267 29.8211 22.3978 29.7156 22.2913C29.6102 22.1847 29.4822 22.1031 29.341 22.0527C29.1998 22.0023 29.0491 21.9843 28.9 22C26.9734 22 25.0464 22 23.119 22C22.9672 21.9805 22.8128 21.9961 22.668 22.0456C22.5231 22.0951 22.3916 22.1773 22.2834 22.2857C22.1753 22.3941 22.0936 22.5258 22.0444 22.6708C21.9953 22.8158 21.9801 22.9702 22 23.122C22 25.0387 22 26.9553 22 28.872C21.9817 29.0236 21.998 29.1773 22.0475 29.3217C22.097 29.4661 22.1785 29.5975 22.2859 29.7059C22.3934 29.8144 22.5239 29.8972 22.6678 29.9481C22.8117 29.999 22.9653 30.0168 23.117 30C24.075 30 25.0333 30 25.992 30Z"
      fill="#57B872"
    />
  </svg>
);

const key = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="12"
      cy="22.5"
      r="6"
      stroke="#F5B941"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2749 18.225L28.4999 6"
      stroke="#F5B941"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27 7.5L30 10.5"
      stroke="#F5B941"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5 12L25.5 15"
      stroke="#F5B941"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const gaming = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="9"
      width="30"
      height="18"
      rx="2"
      stroke="#9C4BB9"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 16.5C8.17157 16.5 7.5 17.1716 7.5 18C7.5 18.8284 8.17157 19.5 9 19.5V16.5ZM15 19.5C15.8284 19.5 16.5 18.8284 16.5 18C16.5 17.1716 15.8284 16.5 15 16.5V19.5ZM13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15H13.5ZM10.5 21C10.5 21.8284 11.1716 22.5 12 22.5C12.8284 22.5 13.5 21.8284 13.5 21H10.5ZM9 19.5H15V16.5H9V19.5ZM10.5 15V21H13.5V15H10.5Z"
      fill="#9C4BB9"
    />
    <path
      d="M22.5 16.5001V16.5151"
      stroke="#9C4BB9"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27 19.5001V19.5151"
      stroke="#9C4BB9"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const License: React.FC = () => {
  const licenses = [
    {
      title: t`Be rewarded for your contribution`,
      content: t`Node owners will be rewarded with exclusive NFT drops and daily MYRIA token rewards for their contribution to the network.`,
      icon: tree,
      bg: 'bg-linear-green'
    },
    {
      title: t`Limited supply available`,
      content: t`Only 40,000 Node Licenses will ever be released. Prices will increase as nodes are sold, to ensure our early supporters are rewarded.`,
      icon: key,
      bg: 'bg-linear-gold'
    },
    {
      title: t`More power than just network support`,
      content: t`Node owners will be rewarded with exclusive NFT drops and daily MYRIA token rewards for their contribution to the network.`,
      icon: gaming,
      bg: 'bg-linear-purple'
    }
  ];

  return (
    <div className="md:bg-base/3 rounded-lg py-8 px-6 text-center md:text-left">
      <p className="heading-list md:text-[28px] text-white">
        <Trans>Myria Node License</Trans>
      </p>
      <p className="body-16-regular text-base/10 mt-3 font-normal md:mr-[52px]">
        <Trans>
          Grow with us and be rewarded. A Myria Node License allows you to operate a node from your
          home computer to support the growth of Myria’s decentralized network. As a node owner,
          you’ll earn daily rewards and exclusive benefits for your contribution.
        </Trans>
      </p>
      {licenses.map((item, idx) => {
        return (
          <div
            key={idx}
            className="bg-base/4 mt-6 flex flex-col items-center rounded-xl p-6 md:flex-row md:px-8">
            <div
              className={clsx(
                'flex h-[80px] w-[80px] items-center justify-center rounded-full p-[22px]',
                item.bg
              )}>
              {item.icon}
            </div>
            <div className="mt-[23px] md:mt-0 md:ml-8 ">
              <p className="text-xl font-bold">{item.title}</p>
              <p className="text-base text-base/9 mt-4 font-normal md:mt-2">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default License;
