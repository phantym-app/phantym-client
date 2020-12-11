import { h } from 'preact';
import type firebase from 'firebase';

const Game = ({ user }: { user: firebase.User }) => {
  const params = new URLSearchParams(window.location.search);

  const id = params.get('id') as string;
  const room = params.get('room');

  // console.log(ref);

  return <h1>hi</h1>;
};

export default Game;
