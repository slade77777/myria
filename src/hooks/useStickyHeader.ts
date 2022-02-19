import { useEffect } from 'react';

export function useStickyHeader(header: HTMLElement | null, offset: number = 50) {
  useEffect(() => {
    if (!header) {
      return;
    }
    
    // Get the offset position of the navbar
    const sticky = header.offsetTop + offset;
    // When the user scrolls the page, execute myFunction
    window.onscroll = function () {
      const stickyClasses = ['fixed', 'top-0', 'bg-dark'];
      if (window.pageYOffset > sticky) {
        header.classList.add(...stickyClasses);
      } else {
        header.classList.remove(...stickyClasses);
      }
    };
  }, [header, offset]);
}
