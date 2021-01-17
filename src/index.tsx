import 'preact/debug'; // TODO delete in production
import './preactImplicitClassnames';

import { h, render } from 'preact';
import { Suspense, lazy, StrictMode } from 'preact/compat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthContainer } from '@store/auth';

import './global.scss';

// lazy route imports
import Header from '@components/views/header/Header';
const Home = lazy(() => import('@routes/Home'));
const Browse = lazy(() => import('@routes/Browse'));
const Login = lazy(() => import('@routes/Login'));
// const Game = lazy(() => import('@routes/Game'));

/* TODO add proper fallbacks */
const Fallback = () => <h1>loading...</h1>;

render(
  <StrictMode>
    <AuthContainer.Provider>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Suspense fallback={<Fallback />}>
              <Route path={'/browse'} render={() => <Browse />} exact />
              <Route path={'/login'} render={() => <Login />} exact />
              <Route path={'/'} render={() => <Home />} />
            </Suspense>
          </Switch>
        </main>
      </BrowserRouter>
    </AuthContainer.Provider>
  </StrictMode>,
  document.getElementById('root') as Element,
);
