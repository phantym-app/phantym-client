import React from 'react';

const Index = () => {
  if (window.location.pathname !== '/') window.location.pathname = '/';
  return <p>loading</p>;
};

export default Index;
