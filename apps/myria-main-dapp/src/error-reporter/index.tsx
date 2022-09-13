import * as Sentry from '@sentry/react';

interface UserContext {
  address: string;
}

export const setUserContext = (context: UserContext) => {
  return Sentry.setContext('user-meta', context);
};

const reporter = {
  setUserContext
};

export default reporter;
