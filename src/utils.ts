import { t } from "@lingui/macro";
import { AllianceInfo, AllianceName, RarityType } from './types/sigil';

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en').format(num);
};
export const paddingX = 'px-6 md:px-12 xl:px-16';
export const negativeMarginXSm = '-mx-6';
export const negativeMarginXMd = 'md:-mx-12';
export const negativeMarginXXl = 'xl:-mx-16';
export const isMobile = () => process.browser && screen && screen.width <= 480;

export const validatePassword = (password: string) => {
  if (!/^.{8,}$/.test(password)) {
    return t`Password must have at least 8 characters—the more characters, the better`;
  }

  if (!/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password)) {
    return t`Password must have both uppercase and lowercase letters`;
  }

  if (!/\d/.test(password) || !/[a-zA-Z]/g.test(password)) {
    return t`Password must be mixture of letters and numbers`;
  }

  if (/^[a-zA-Z0-9]*$/.test(password)) {
    return t`Password must contain at least one special character`;
  }

  return undefined;
};

export const getRarityColor = (rarity: RarityType) => {
  switch (rarity) {
    case 'common':
      return '#A9A6B1';
    case 'rare':
      return '#A9CB68';
    case 'ultra_rare':
      return '#4FA6B9';
    case 'epic':
      return '#D191E1';
    case 'celestial':
      return '#CBE352';
    default:
      return '#A9A6B1';
  }
};


export const getAllianceInfo = (allianceId: AllianceName): AllianceInfo => {
  switch (allianceId) {
    case "equinox":
      return {
        id: allianceId,
        name: "EQUINOX",
        img: "/images/nodes/insignia/alliance_sigilC.png"
      };
    case "federation":
      return {
        id: allianceId,
        name: "THE FEDERATION",
        img: "/images/nodes/insignia/alliance_sigilA.png"
      };
    case "vector_prime":
      return {
        id: allianceId,
        name: "VECTOR PRIME",
        img: "/images/nodes/insignia/alliance_sigilB.png"
      };
  }
}