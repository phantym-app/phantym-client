import '../dev/mods/preact/preactImplicitClassnames';

import { h, render } from 'preact';
import { Suspense, lazy, StrictMode } from 'preact/compat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthContainer } from '@store/auth';

import './global.scss';

import Header from '@components/views/header/Header';
import Loader from '@components/elements/loader/Loader';

const Home = lazy(() => import('@routes/Home'));
const Browse = lazy(() => import('@routes/Browse'));
const Login = lazy(() => import('@routes/Login'));
const Settings = lazy(() => import('@routes/Settings'));
const Room = lazy(() => import('@routes/Room'));
const Friends = lazy(() => import('@routes/Friends'));
const Cart = lazy(() => import('@routes/Cart'));
const BrowseGame = lazy(() => import('@routes/Browse/Game'));

async function _render() {
  if (import.meta.hot) {
    // dev only
    await import('preact/debug');
  }

  render(
    <StrictMode>
      <AuthContainer.Provider>
        <BrowserRouter>
          <Header />
          <main>
            <Switch>
              <Suspense fallback={<Loader />}>
                <Route path={'/room'} render={() => <Room />} exact />
                <Route path={'/cart'} render={() => <Cart />} exact />
                <Route path={'/social'} render={() => <Friends />} exact />
                <Route path={'/settings'} render={() => <Settings />} exact />
                <Route path={'/browse/game'} render={() => <BrowseGame />} exact />
                <Route path={'/browse'} render={() => <Browse />} exact />
                <Route path={'/login'} render={() => <Login />} exact />
                <Route path={'/'} render={() => <Home />} exact />
              </Suspense>
            </Switch>
          </main>
        </BrowserRouter>
      </AuthContainer.Provider>
    </StrictMode>,
    document.getElementById('root') as Element,
  );
}

_render();
