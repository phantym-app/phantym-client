export function matchesWidth(width: string, maxMin: 'max' | 'min') {
  const maxMinValue = maxMin === 'max' ? 'max-width' : 'min-width';
  if (window.matchMedia(`(${maxMinValue}: ${width}px)`).matches) {
    return true;
  } else {
    return false;
  }
}
