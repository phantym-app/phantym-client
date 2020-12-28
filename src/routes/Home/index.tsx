import { h } from 'preact';
import Loader from '../../components/elements/loader/Loader';

const Index = () => {
  if (window.location.pathname !== '/') window.location.pathname = '/';
  return <Loader />;
};

export default Index;
