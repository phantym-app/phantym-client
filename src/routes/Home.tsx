import React from 'react';
import type firebase from 'firebase';
import Button from '../components/elements/button/Button';

import useAwait from '../logic/useAwait';
import { userPromise } from '../logic/firebase';

const Index = () => {
  const { status, value } = useAwait(userPromise);

  if (status === 'pending' || value === undefined) {
    return <p>loading</p>;
  } else {
    return (
      <>
        <p>signed in as - {value.uid}</p>
        <Button>
          button
        </Button>
      </>
    );
  }


  // TODO handle error case
};

export default Index;
