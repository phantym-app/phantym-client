import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AuthContainer } from './store/auth';

import './global.scss';

// lazy route imports
const Browse = React.lazy(() => import('./routes/Browse'));
const Login = React.lazy(() => import('./routes/Login'));
const Home = React.lazy(() => import('./routes/Home'));

const LazyRoute = ({ path, component: Component, props, fallback }: any) => (
  <Route
    path={path}
    render={() => (
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    )}
  />
);

/* TODO add proper fallbacks */
const Fallback = () => <div>loading...</div>;

const App = () => {
  const { user, signInWithGoogle, signOut } = AuthContainer.useContainer();

  return (
    <>
      <main>
        {user && (
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
        )}
      </main>
    </>
  );
};

render(
  <React.StrictMode>
    <AuthContainer.Provider>
      <Router>
        <App />
      </Router>
    </AuthContainer.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
