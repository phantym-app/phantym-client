import { h } from 'preact';

import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <Link to='/login'>login</Link>
    </div>
  );
}

export default Index;
