import { useState } from 'preact/hooks';

export function useBrowse() {
  const [activeLabels, setActiveLabel] = useState<string[]>([]);

  return { activeLabels, setActiveLabel };
}
