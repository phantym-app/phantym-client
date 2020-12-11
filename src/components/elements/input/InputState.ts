import { useState } from 'preact/hooks';

export function useInput() {
  const [iconState, setIconState] = useState('');
  const [value, setValue] = useState('');
  const [valueVisibility, setValueVisibility] = useState(true);

  return {
    iconState,
    setIconState,
    value,
    setValue,
    valueVisibility,
    setValueVisibility,
  };
}
