import { h } from 'preact';
import { AuthContainer } from '@store/auth';

function Browse() {
  const { signOut } = AuthContainer.useContainer();

  return (
    <div>
      <button onClick={signOut}>foo</button>
    </div>
  );
}

export default Browse;
