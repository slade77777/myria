import React, { useEffect, useState } from 'react';
import DesktopInterop from 'src/components/interop/DesktopInterop';
import MobileInterop from 'src/components/interop/MobileInterop';

const Interoperability = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsMobile(window.innerWidth < 920);
  }, []);

  if (isMobile === undefined) {
    return null;
  }
  return isMobile ? <MobileInterop /> : <DesktopInterop />;
};

export default Interoperability;
