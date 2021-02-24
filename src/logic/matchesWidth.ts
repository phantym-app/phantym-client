export function matchesWidth(width: string, maxMin: 'max' | 'min'): boolean {
  const maxMinValue = maxMin === 'max' ? 'max-width' : 'min-width';
  if (window.matchMedia(`(${maxMinValue}: ${width}px)`).matches) {
    return true;
  } else {
    return false;
  }
}

export const maxMobile = matchesWidth('500', 'max');
export const minTablet = matchesWidth('500', 'min');
export const maxTablet = matchesWidth('850', 'max');
export const minDesktop = matchesWidth('850', 'min');
export const maxDesktop = matchesWidth('1200', 'max');
