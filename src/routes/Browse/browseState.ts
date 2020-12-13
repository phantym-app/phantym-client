import { useState } from 'preact/hooks';

export function useBrowse() {
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return { activeLabels, setActiveLabel, searchQuery, setSearchQuery };
}
