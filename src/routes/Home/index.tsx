import { h } from 'preact';

function Index() {
  if (window.location.pathname !== '/') window.location.pathname = '/';

  return <p>loading</p>;
}

export default Index;
