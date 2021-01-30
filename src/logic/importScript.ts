function importScript(url: string): Promise<Event> {
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
}

export default importScript;
