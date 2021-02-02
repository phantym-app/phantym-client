import { h } from 'preact';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import StateProvider from '@store';

import { render } from '@testing-library/preact';
import Header from './Header';

describe('header', function () {
  it('renders', function () {
    const { unmount } = render(
      <StateProvider>
        <Router history={createMemoryHistory()}>
          <Header />
        </Router>
      </StateProvider>,
    );
    unmount();
  });
});
