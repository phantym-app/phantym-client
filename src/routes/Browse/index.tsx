import { h } from 'preact';

const Browse = ({ user, signOut }: any) => {
  return (
    <p>
      <button onClick={signOut}>foo</button>
    </p>
  );
};

export default Browse;
