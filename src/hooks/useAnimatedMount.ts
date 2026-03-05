import { useState, useEffect } from 'react';

export type MountState = 'opening' | 'open' | 'closing';

export function useAnimatedMount(isOpen: boolean, duration = 350) {
  const [mounted, setMounted] = useState(isOpen);
  const [state, setState] = useState<MountState>(isOpen ? 'open' : 'opening');

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Trigger opening on next frame so CSS transition fires
      const raf = requestAnimationFrame(() => setState('opening'));
      const t = setTimeout(() => setState('open'), 20);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    } else {
      setState('closing');
      const t = setTimeout(() => {
        setMounted(false);
        setState('opening');
      }, duration);
      return () => clearTimeout(t);
    }
  }, [isOpen, duration]);

  return { mounted, state };
}
