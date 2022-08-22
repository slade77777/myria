import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { validateResolution } from 'src/utils';

export default function useCheckMobileView() {
  const isMobile = validateResolution();
  const [isResolution, setIsSolution] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if (!isResolution) {
      router.push('/');
    }
  }, [isResolution, router]);

  return {
    isMobile,
    isResolution,
    setIsSolution
  };
}
