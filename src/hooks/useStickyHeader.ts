import { RefObject, useEffect } from 'react';

export function useStickyHeader(headerRef: RefObject<HTMLElement | null>, stickyHeader: boolean=true) {
  useEffect(() => {
    if (!headerRef.current || !stickyHeader ) {
      return;
    }
    const header = headerRef.current;
    // Get the offset position of the navbar
    const sticky = header.offsetTop + header.getBoundingClientRect().top;
    const handleScroll = () => {
      const stickyClasses = ['fixed', 'top-0', 'bg-dark'];
      if (window.pageYOffset > sticky) {
        header.classList.add(...stickyClasses);
      } else {
        header.classList.remove(...stickyClasses);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerRef]);
}
