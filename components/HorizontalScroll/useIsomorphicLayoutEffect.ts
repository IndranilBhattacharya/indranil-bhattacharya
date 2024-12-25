// components/HorizontalScroll/useIsomorphicLayoutEffect.ts
import { useEffect, useLayoutEffect } from "react";

/**
 * Custom hook that uses useLayoutEffect in the browser and useEffect during SSR
 * This prevents warnings during server-side rendering while maintaining
 * the benefits of useLayoutEffect in the browser
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
