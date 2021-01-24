import { useState } from 'preact/hooks';

export function useHeader() {
  const [visibility, setVisibility] = useState<boolean>(true);

  return {
    visibility,
    setVisibility,
  };
}
