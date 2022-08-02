import React from 'react';

export default function useInstalledWallet() {
  const [installedWallet, setInstalledWallet] = React.useState<'PENDING' | boolean>('PENDING');

  React.useEffect(() => {
    if (!!window.ethereum) {
      setInstalledWallet(true);
    } else {
      setInstalledWallet(false);
    }
  }, []);

  return { installedWallet };
}
