import { t } from "@lingui/macro";
import { RarityType } from './types/sigil';

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en').format(num);
};
export const paddingX = 'px-6 md:px-12 xl:px-16';
export const negativeMarginXSm = '-mx-6';
export const negativeMarginXMd = 'md:-mx-12';
export const negativeMarginXXl = 'xl:-mx-16';
export const isMobile = () => process.browser && screen && screen.width <= 480;

export const validatePassword = (password: string) => {
  if (!/^(?=.*\d).{8,}$/.test(password)) {
    return t`Password must have at least 8 characters—the more characters, the better`
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(password)) {
    return t`Password must have both uppercase and lowercase letters`
  }

  if (!/\d/.test(password) || !/[a-zA-Z]/g.test(password)) {
    return t`Password must be mixture of letters and numbers`
  }

  if (/^[a-zA-Z0-9 ]*$/.test(password)) {
    return t`Password must contain at least one special character`
  }

  return undefined
};

export const removeParamFromURL = (key: string, sourceURL: string) => {
  let rtn = sourceURL.split("?")[0],
    param,
    paramsArr = [],
    queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    paramsArr = queryString.split("&");
    for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
      param = paramsArr[i].split("=")[0];
      if (param === key) {
        paramsArr.splice(i, 1);
      }
    }
    if (paramsArr.length) rtn = rtn + "?" + paramsArr.join("&");
  }
  return rtn;
}

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
