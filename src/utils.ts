export const paddingX = 'px-6 md:px-[48px] xl:px-[64px]';

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en').format(num);
};
