import { useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

function useBrowse() {
  const [activeLabels, setActiveLabel] = useState<string[]>([]);

  return { activeLabels, setActiveLabel };
}

export const browseContainer = createContainer(useBrowse);
