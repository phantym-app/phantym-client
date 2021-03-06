import '@logic/preactImplicitClassnames';

import { h, render } from 'preact';
import Router from 'preact-router';
import Match from 'preact-router/match';
import AsyncRoute from 'preact-async-route';

import StoreProvider from '@store';

import './global.scss';

import Sidebar from '@components/views/sidebar/Sidebar';
import Loader from '@components/elements/loader/Loader';

function Route({ get, ...params }: any) {
  const getComponent = async () => (await get()).default;
  return <AsyncRoute {...params} getComponent={getComponent} loading={() => <Loader />} />;
}

async function _render() {
  if (import.meta.hot) {
    // dev only
    await import('preact/debug');
  }

  render(
    <StoreProvider>
      <Match default>{Sidebar}</Match>
      <main>
        <Router>
          <Route path='/' get={() => import('@routes/Home')} />
          <Route path='/login' get={() => import('@routes/Login')} />
          <Route path='/room' get={() => import('@routes/Room')} />
          <Route path='/browse' get={() => import('@routes/Browse')} />
          <Route path='/cart' get={() => import('@routes/Cart')} />
          <Route path='/social/:tab' get={() => import('@routes/Friends')} />
          <Route path='/settings' get={() => import('@routes/Settings')} />
          {/* <Route path={'/play/:gameid'} render={() => <Game />} exact /> */}
        </Router>
      </main>
    </StoreProvider>,
    document.getElementById('root') as Element,
  );
}
_render();
