import { useEffect, useCallback, useState } from 'preact/hooks';

function useAwait<V>(promise: Promise<V>) {
  const [flatPromise, _set] = useState<
    | { status: 'pending'; value: undefined; error: undefined }
    | { status: 'success'; value: V; error: undefined }
    | { status: 'error'; value: undefined; error: any }
  >({
    status: 'pending',
    value: undefined,
    error: undefined,
  });

  let hasCanceled = false;

  const execute = useCallback(
    function () {
      promise
        .then(value => !hasCanceled && _set({ status: 'success', value, error: undefined }))
        .catch(error => !hasCanceled && _set({ status: 'error', value: undefined, error }));
    },
    [promise],
  );

  // const cancel = useCallback(function () {
  //   hasCanceled = true;
  // }, []);

  useEffect(execute, [execute]);
  // useEffect(() => cancel, []);

  // return { ...flatPromise, cancel };
  return { ...flatPromise };
}

export default useAwait;
