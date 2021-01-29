type Args = [(...args: any[]) => any, number, boolean?];

export default function debounce(...args: Args) {
  const [func, wait, instant = false] = args;
  let timeout: any;

  return function (...args: any[]) {
    // @ts-ignore
    const context = this;

    function delayedFunc() {
      clearTimeout(timeout);
      if (!instant) func.apply(context, args);
    }

    const callNow = instant && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(delayedFunc, wait);

    if (callNow) func.apply(context, args);
  };
}
