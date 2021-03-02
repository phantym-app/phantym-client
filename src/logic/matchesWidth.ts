export function matchesWidth(width: string, maxOrMin: 'max' | 'min'): boolean {
  return window.matchMedia(`(${maxOrMin}-width: ${width}px)`).matches;
}
