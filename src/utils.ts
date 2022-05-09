import { RarityType } from './types/sigil';

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en').format(num);
};
export const paddingX = 'px-6 md:px-12 xl:px-16';
export const negativeMarginXSm = '-mx-6';
export const negativeMarginXMd = 'md:-mx-12';
export const negativeMarginXXl = 'xl:-mx-16';
export const isMobile = () => process.browser && screen && screen.width <= 480;
export const getRarityColor = (rarity: RarityType) => {
  switch (rarity) {
    case 'common':
      return '#A9A6B1';
    case 'rare':
      return '#A9CB68';
    case 'ultra rare':
      return '#4FA6B9';
    case 'epic':
      return '#D191E1';
    case 'celestial':
      return '#CBE352';
    default:
      return '#A9A6B1';
  }
};
