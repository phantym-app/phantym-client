import 'preact/debug'; // delete in production

import { h, render, Fragment } from 'preact';
import { Suspense, lazy, StrictMode } from 'preact/compat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthContainer } from './store/auth';

import './global.scss';

// lazy route imports
const Browse = lazy(() => import('./routes/Browse'));
const Login = lazy(() => import('./routes/Login'));
const Home = lazy(() => import('./routes/Home'));
const Header = lazy(() => import('./components/views/header/Header'));

const LazyRoute = ({ path, component: Component, props, fallback }: any) => (
  <Route
    path={path}
    render={() => (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )}
  />
);

/* TODO add proper fallbacks */
const Fallback = () => <div>loading...</div>;

const App = () => {
  const { user, signInWithGoogle, signOut } = AuthContainer.useContainer();

  return (
    <BrowserRouter>
      {user && (
        <>
          <Suspense fallback={<Fallback />}>
            {window.location.pathname !== '/login' && <Header user={user} />}
          </Suspense>
          <main>
            <Switch>
              <LazyRoute
                path={'/browse'}
                component={Browse}
                props={{ user, signOut }}
                fallback={<Fallback />}
                exact
              />

              {user.isAnonymous && (
                <LazyRoute
                  path={'/login'}
                  component={Login}
                  props={{ user, signInWithGoogle }}
                  fallback={<Fallback />}
                  exact
                />
              )}

              <LazyRoute
                path={'/'}
                component={Home}
                props={{ user }}
                fallback={<Fallback />}
              />
            </Switch>
          </main>
        </>
      )}
    </BrowserRouter>
  );
};

render(
  <StrictMode>
    <AuthContainer.Provider>
      <App />
    </AuthContainer.Provider>
  </StrictMode>,
  document.getElementById('root') as Element,
);
