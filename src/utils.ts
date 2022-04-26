import { t } from "@lingui/macro";

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

  return null
};

