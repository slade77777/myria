import { t, Trans } from '@lingui/macro';
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
  <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.60098 32C9.37021 32.0001 9.14563 31.9254 8.96098 31.787L4.69598 28.587C4.56363 28.4876 4.45623 28.3588 4.38229 28.2108C4.30835 28.0627 4.2699 27.8995 4.26998 27.734V17.574C2.55697 16.4302 1.25728 14.7657 0.562906 12.8265C-0.131468 10.8873 -0.183703 8.77612 0.413918 6.80492C1.01154 4.83373 2.22732 3.10703 3.88167 1.87989C5.53601 0.65274 7.54119 -0.00976563 9.60098 -0.00976562C11.6608 -0.00976563 13.6659 0.65274 15.3203 1.87989C16.9746 3.10703 18.1904 4.83373 18.788 6.80492C19.3857 8.77612 19.3334 10.8873 18.639 12.8265C17.9447 14.7657 16.645 16.4302 14.932 17.574V19.205C14.9328 19.3453 14.906 19.4844 14.8529 19.6143C14.7999 19.7442 14.7218 19.8624 14.623 19.962L13.237 21.337L14.619 22.713C14.7189 22.8121 14.7983 22.93 14.8524 23.0599C14.9066 23.1899 14.9344 23.3292 14.9344 23.47C14.9344 23.6108 14.9066 23.7501 14.8524 23.88C14.7983 24.01 14.7189 24.1279 14.619 24.227L13.233 25.603L14.619 26.978C14.7271 27.0864 14.8107 27.2167 14.864 27.3602C14.9173 27.5037 14.9392 27.657 14.9281 27.8097C14.917 27.9624 14.8732 28.1109 14.7997 28.2452C14.7262 28.3795 14.6246 28.4964 14.502 28.588L10.237 31.788C10.0533 31.9252 9.83026 31.9996 9.60098 32V32ZM6.40098 27.2L9.60098 29.6L12.241 27.613L10.972 26.355C10.872 26.2559 10.7927 26.138 10.7385 26.008C10.6844 25.8781 10.6565 25.7388 10.6565 25.598C10.6565 25.4572 10.6844 25.3179 10.7385 25.1879C10.7927 25.058 10.872 24.9401 10.972 24.841L12.358 23.466L10.972 22.091C10.872 21.9919 10.7927 21.874 10.7385 21.744C10.6844 21.6141 10.6565 21.4748 10.6565 21.334C10.6565 21.1932 10.6844 21.0539 10.7385 20.9239C10.7927 20.794 10.872 20.6761 10.972 20.577L12.795 18.764V16.988C12.7961 16.8019 12.8458 16.6194 12.9393 16.4585C13.0328 16.2976 13.1668 16.164 13.328 16.071C14.7507 15.2496 15.8627 13.9816 16.4914 12.4638C17.1201 10.946 17.2304 9.26316 16.8052 7.67628C16.38 6.0894 15.443 4.68716 14.1397 3.68705C12.8363 2.68694 11.2393 2.14485 9.59648 2.14485C7.95362 2.14485 6.35666 2.68694 5.05329 3.68705C3.74992 4.68716 2.81298 6.0894 2.38777 7.67628C1.96257 9.26316 2.07287 10.946 2.70156 12.4638C3.33026 13.9816 4.44222 15.2496 5.86498 16.071C6.02613 16.164 6.16011 16.2976 6.25362 16.4585C6.34713 16.6194 6.3969 16.8019 6.39798 16.988L6.40098 27.2Z"
      fill="#F5B941"
    />
    <path
      d="M9.59692 8.43945C10.1492 8.43945 10.5969 7.99174 10.5969 7.43945C10.5969 6.88717 10.1492 6.43945 9.59692 6.43945C9.04464 6.43945 8.59692 6.88717 8.59692 7.43945C8.59692 7.99174 9.04464 8.43945 9.59692 8.43945Z"
      fill="#F5B941"
    />
    <path
      d="M9.59693 9.39649C9.20136 9.39649 8.81468 9.27919 8.48578 9.05942C8.15689 8.83966 7.90054 8.5273 7.74917 8.16185C7.59779 7.7964 7.55818 7.39427 7.63535 7.0063C7.71252 6.61834 7.90301 6.26198 8.18271 5.98227C8.46242 5.70257 8.81878 5.51209 9.20674 5.43491C9.59471 5.35774 9.99684 5.39735 10.3623 5.54873C10.7277 5.7001 11.0401 5.95645 11.2599 6.28535C11.4796 6.61424 11.5969 7.00092 11.5969 7.39649C11.5969 7.92692 11.3862 8.43563 11.0111 8.8107C10.6361 9.18577 10.1274 9.39649 9.59693 9.39649Z"
      fill="#F5B941"
    />
  </svg>
);

const gaming = (
  <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31.773 31.9992H29.973C28.9317 31.9961 27.9088 31.7249 27.0027 31.2118C26.0967 30.6986 25.3381 29.9607 24.8 29.0692L23.638 27.1412C23.4005 26.7484 23.0657 26.4235 22.6659 26.1979C22.2662 25.9722 21.815 25.8535 21.356 25.8532H16.438C15.9791 25.8544 15.5283 25.9735 15.1287 26.199C14.7291 26.4246 14.3942 26.749 14.156 27.1412L12.994 29.0692C12.4576 29.9598 11.7009 30.6973 10.7968 31.2107C9.89272 31.724 8.87167 31.9959 7.832 32.0002H6.032C4.43305 31.9986 2.90001 31.3629 1.76919 30.2324C0.638374 29.102 0.00211773 27.5691 0 25.9702V15.1072C-1.24596e-06 12.8239 0.906412 10.634 2.52009 9.01864C4.13377 7.40328 6.32272 6.49457 8.606 6.49219H29.2C31.4822 6.49616 33.6696 7.40557 35.282 9.02076C36.8944 10.636 37.8 12.8249 37.8 15.1072V25.9702C37.7976 27.5681 37.1619 29.0999 36.0322 30.23C34.9025 31.3601 33.3709 31.9963 31.773 31.9992V31.9992ZM16.438 22.4822H21.356C22.3972 22.4849 23.4201 22.7561 24.3259 23.2695C25.2317 23.7829 25.9898 24.5213 26.527 25.4132L27.689 27.3412C27.9272 27.7334 28.2621 28.0578 28.6617 28.2834C29.0613 28.5089 29.5121 28.628 29.971 28.6292H31.771C32.4767 28.6292 33.1536 28.3488 33.6526 27.8498C34.1516 27.3508 34.432 26.6739 34.432 25.9682V15.1072C34.4299 13.7197 33.8782 12.3895 32.8976 11.4078C31.9171 10.4261 30.5875 9.87289 29.2 9.86919H8.606C7.21745 9.8713 5.88637 10.4238 4.90451 11.4057C3.92265 12.3876 3.37012 13.7186 3.368 15.1072V25.9702C3.368 26.6759 3.64835 27.3528 4.14739 27.8518C4.64642 28.3508 5.32326 28.6312 6.029 28.6312H7.829C8.28649 28.6286 8.7357 28.5089 9.13378 28.2834C9.53186 28.0579 9.86554 27.7342 10.103 27.3432L11.265 25.4152C11.8027 24.5231 12.5611 23.7847 13.4672 23.2709C14.3733 22.7572 15.3964 22.4856 16.438 22.4822V22.4822Z"
      fill="#9C4BB9"
    />
    <path
      d="M18.526 9.263C18.3049 9.263 18.0859 9.21944 17.8816 9.13481C17.6773 9.05018 17.4916 8.92614 17.3353 8.76977C17.1789 8.61339 17.0549 8.42775 16.9702 8.22344C16.8856 8.01913 16.842 7.80015 16.842 7.579V1.684C16.842 1.23738 17.0195 0.809043 17.3353 0.493232C17.6511 0.177421 18.0794 0 18.526 0C18.9727 0 19.401 0.177421 19.7168 0.493232C20.0326 0.809043 20.21 1.23738 20.21 1.684V7.579C20.21 7.80015 20.1665 8.01913 20.0819 8.22344C19.9972 8.42775 19.8732 8.61339 19.7168 8.76977C19.5604 8.92614 19.3748 9.05018 19.1705 9.13481C18.9662 9.21944 18.7472 9.263 18.526 9.263V9.263Z"
      fill="#9C4BB9"
    />
    <path
      d="M11.79 18.2899H6.73698C6.29035 18.2899 5.86202 18.1125 5.54621 17.7966C5.2304 17.4808 5.05298 17.0525 5.05298 16.6059C5.05298 16.1593 5.2304 15.7309 5.54621 15.4151C5.86202 15.0993 6.29035 14.9219 6.73698 14.9219H11.79C12.2366 14.9219 12.6649 15.0993 12.9807 15.4151C13.2966 15.7309 13.474 16.1593 13.474 16.6059C13.474 17.0525 13.2966 17.4808 12.9807 17.7966C12.6649 18.1125 12.2366 18.2899 11.79 18.2899V18.2899Z"
      fill="#9C4BB9"
    />
    <path
      d="M9.2631 20.8077C8.81648 20.8077 8.38815 20.6303 8.07233 20.3145C7.75652 19.9987 7.5791 19.5703 7.5791 19.1237V14.0707C7.5791 13.6241 7.75652 13.1958 8.07233 12.8799C8.38815 12.5641 8.81648 12.3867 9.2631 12.3867C9.70973 12.3867 10.1381 12.5641 10.4539 12.8799C10.7697 13.1958 10.9471 13.6241 10.9471 14.0707V19.1237C10.9471 19.5703 10.7697 19.9987 10.4539 20.3145C10.1381 20.6303 9.70973 20.8077 9.2631 20.8077V20.8077Z"
      fill="#9C4BB9"
    />
    <path
      d="M28.6311 15.1987C29.4076 15.1987 30.0371 14.5692 30.0371 13.7927C30.0371 13.0162 29.4076 12.3867 28.6311 12.3867C27.8546 12.3867 27.2251 13.0162 27.2251 13.7927C27.2251 14.5692 27.8546 15.1987 28.6311 15.1987Z"
      fill="#9C4BB9"
    />
    <path
      d="M28.6311 20.8159C29.4076 20.8159 30.0371 20.1864 30.0371 19.4099C30.0371 18.6334 29.4076 18.0039 28.6311 18.0039C27.8546 18.0039 27.2251 18.6334 27.2251 19.4099C27.2251 20.1864 27.8546 20.8159 28.6311 20.8159Z"
      fill="#9C4BB9"
    />
    <path
      d="M25.8269 18.0034C26.6034 18.0034 27.2329 17.3739 27.2329 16.5974C27.2329 15.8209 26.6034 15.1914 25.8269 15.1914C25.0504 15.1914 24.4209 15.8209 24.4209 16.5974C24.4209 17.3739 25.0504 18.0034 25.8269 18.0034Z"
      fill="#9C4BB9"
    />
    <path
      d="M31.4351 18.0034C32.2116 18.0034 32.8411 17.3739 32.8411 16.5974C32.8411 15.8209 32.2116 15.1914 31.4351 15.1914C30.6585 15.1914 30.0291 15.8209 30.0291 16.5974C30.0291 17.3739 30.6585 18.0034 31.4351 18.0034Z"
      fill="#9C4BB9"
    />
  </svg>
);

const License: React.FC = () => {
  const licenses = [
    {
      title: t`Be rewarded for your contribution`,
      content: t`Node owners will be rewarded with exclusive NFT drops and daily MYRIA token rewards for their contribution to the network.`,
      icon: tree
    },
    {
      title: t`Limited supply available`,
      content: t`Only 50,000 Node Licenses will ever be released. Prices will increase as nodes are sold, to ensure our early supporters are rewarded.`,
      icon: key
    },
    {
      title: t`More power than just network support`,
      content: t`Nodes are an integral part of the Myria universe, with dedicated lore, gaming access, and exclusive voting power granted to node owners.`,
      icon: gaming
    }
  ];

  return (
    <div className="absolute top-0 left-0 bottom-0 right-[-17px] overflow-y-auto rounded-lg p-8 text-center md:bg-brand-deep-blue md:text-left">
      <p className="heading-list text-white md:heading-md">
        <Trans>Myria Node License</Trans>
      </p>
      <p className="body-sm mt-6 font-normal text-light md:mr-[42px]">
        <Trans>
          Grow with us and be rewarded. A Myria Node License allows you to operate a node from your
          home computer to support the growth of Myria’s decentralized network. As a node owner,
          you’ll earn daily rewards and exclusive benefits for your contribution.
        </Trans>
      </p>
      <img src={'/images/dashboard.png'} className="mt-[59px] w-full" alt="" />
      {licenses.map((item, idx) => {
        return (
          <div
            key={idx}
            className="mt-6 flex flex-col items-center bg-dark p-6 md:flex-row md:px-8">
            <div className="flex h-[91px] w-[91px] items-center justify-center rounded-full bg-brand-dark-blue p-[30px]">
              {item.icon}
            </div>
            <div className="mt-[23px] md:mt-0 md:ml-8 ">
              <p className="heading-list">{item.title}</p>
              <p className="body-sm mt-4 font-normal text-light md:mt-2">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default License;
