import { h } from 'preact';

const Index = () => {
  if (window.location.pathname !== '/') window.location.pathname = '/';
  return <p>loading</p>;
};

export default Index;
