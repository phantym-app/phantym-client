type fn = (any: any) => any;

declare interface Window {
  pipe(...fns: (fn | string)[]): (arg: any) => any;
  loadScript(url: string): Promise<Event>;
  wait(ms: number): <T>(v: T) => Promise<T>;
}

window.pipe = (...fns) => (args = null) => fns.reduce((A, fn) => (typeof fn === 'string' ? A[fn] : fn(A)), args);

window.loadScript = function (url) {
  const s = document.createElement('script');
  s.src = url;
  s.type = 'text/javascript';
  s.async = true;

  return new Promise(function (res) {
    s.addEventListener('load', onload);
    document.body.appendChild(s);

    function onload(e: Event) {
      s.removeEventListener('load', onload);
      res(e);
    }
  });
};

window.wait = ms => v => new Promise(res => setTimeout(async () => res(await v), ms));
