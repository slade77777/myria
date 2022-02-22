import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';
import { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useStickyHeader(headerRef: RefObject<HTMLElement | null>, stickyHeader = true) {
  useIsomorphicLayoutEffect(() => {
    if (!headerRef?.current || !stickyHeader) {
      return;
    }
    const effect = ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top top',
      endTrigger: 'body',
      end: 'bottom+=1000px bottom',
      toggleClass: 'sticky-header'
    });
    return () => {
      effect.kill();
    };
  }, [headerRef, stickyHeader]);
}
