import { useEffect, useLayoutEffect } from 'react';

export const useDynamicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
