import { useState } from "react";

export function useHeader() {
  const [activeMenu, setActiveMenu] = useState('');

  return {
    activeMenu,
    setActiveMenu,
  };
};