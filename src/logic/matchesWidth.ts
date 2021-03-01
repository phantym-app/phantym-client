export function matchesWidth(width: string, maxOrMin: 'max' | 'min'): boolean {
  let foo = window.matchMedia(`(${maxOrMin}-width: ${width}px)`);

  return foo.matches;
}
