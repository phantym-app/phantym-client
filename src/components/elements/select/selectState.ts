import { useState } from 'preact/hooks';

export function useSelect() {
  const [value, setValue] = useState<string>('');
  const [isOpen, setOpen] = useState(false);

  return {
    value,
    setValue,
    isOpen,
    setOpen,
  };
}
