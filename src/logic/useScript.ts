import { useEffect } from 'preact/hooks';

export default function useScript(url: string) {
  let handleLoad: (value: unknown) => void;
  let handleError: (reason?: any) => void;

  let scriptHasLoaded = new Promise(function (res, rej) {
    handleLoad = res;
    handleError = rej;
  });

  useEffect(
    function () {
      const script = document.createElement('script');

      script.src = url;
      script.type = 'text/javascript';
      script.async = true;

      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);

      document.body.appendChild(script);

      return function () {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);

        document.body.removeChild(script);
      };
    },
    [url],
  );

  return scriptHasLoaded;
}
