import React from 'react';
import type firebase from 'firebase';

import useAwait from '../logic/useAwait';
import { userPromise } from '../logic/firebase';

const Index = () => {
  const { status, value } = useAwait(userPromise);

  if (status === 'pending' || value === undefined) return <p>loading</p>;

  return <p>signed in as - {value.uid}</p>;

  // TODO handle error case
};

export default Index;
