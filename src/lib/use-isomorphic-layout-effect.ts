import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client (runs before paint — prevents animation FOUC),
 * useEffect on the server (avoids the SSR warning).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
