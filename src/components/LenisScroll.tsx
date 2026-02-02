import { useLayoutEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export default function LenisScroll() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      anchors: { offset: -100 },
    });

    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
