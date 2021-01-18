import { useState } from 'preact/hooks';

export function useLabel() {
  const [activeState, setActiveState] = useState<string>('');
  return { activeState, setActiveState };
}
