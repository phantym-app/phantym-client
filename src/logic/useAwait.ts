import { useEffect, useMemo, useState } from 'preact/hooks';

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

  const execute = useMemo(
    () =>
      function () {
        promise
          .then(value => _set({ status: 'success', value, error: undefined }))
          .catch(error => _set({ status: 'error', value: undefined, error }));
      },
    [promise],
  );

  useEffect(execute, [execute]);

  return flatPromise;
}

export default useAwait;
