import { useEffect, useState } from 'preact/hooks';
import type { StateUpdater } from 'preact/hooks';

export default function useAsyncState<T>(init: T | Promise<T>) {
  const [state, __setState] = useState(init instanceof Promise ? undefined : init);

  const [resolved, setResolved] = useState<boolean>(false);

  const [[state$, resolver], __setState$] = useState(
    (() => {
      let resolver;
      return [new Promise(res => (resolver = res)), resolver];
    })(),
  );

  function setState(s) {
    __setState(s);
    if (resolved) {
      __setState$([Promise.resolve(s)]);
    } else {
      resolver(s);
      setResolved(true);
    }
  }

  useEffect(async function () {
    if (init instanceof Promise) setState(await init);
  }, []);

  return [state, state$, setState] as [T, Promise<T>, StateUpdater<T>];
}
