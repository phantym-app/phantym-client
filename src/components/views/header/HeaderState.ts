import { useState } from 'preact/hooks';

export function useHeader() {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  return {
    visibility,
    setVisibility,
    isCollapsed,
    setCollapsed,
  };
}
