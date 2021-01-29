import { useState } from 'preact/hooks';
import type { StateUpdater } from 'preact/hooks';

export default function usePromisedState<T>(init: T) {
  const [state, __setState] = useState(init);

  let resolver: (value) => void;
  const [statePromise, __setStatePromise] = useState(new Promise(res => (resolver = res)));
  const [resolved, setResolved] = useState<boolean>(false);

  function setState(s) {
    __setState(s);
    if (!resolved) {
      resolver(s);
      setResolved(true);
    } else {
      __setStatePromise(Promise.resolve(s));
    }
  }

  return [state, statePromise, setState] as [T, Promise<T>, StateUpdater<T>];
}
