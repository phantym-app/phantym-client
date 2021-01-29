import { useState } from 'preact/hooks';

export const useHamburger = () => {
  const [isActive, setActive] = useState<boolean>(false);

  return {
    isActive,
    setActive,
  };
};
