type fn = (any: any) => any;

declare interface Window {
  pipe(...fns: (fn | string)[]): (arg: any) => any;
  importScript(url: string): Promise<Event>;
}

window.pipe = (...fns) => (args = null) => fns.reduce((A, fn) => (typeof fn === 'string' ? A[fn] : fn(A)), args);

window.importScript = function (url) {
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
