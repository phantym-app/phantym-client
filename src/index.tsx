import React, { lazy } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AuthContainer } from './store/auth';

import './global.css';

type LazyRoute = React.LazyExoticComponent<() => JSX.Element>;
type RouteInfo = [string, LazyRoute];

// lazy route imports
const routes: RouteInfo[] = [
  ['/browse', lazy(() => import('./routes/Browse'))],
  ['/login', lazy(() => import('./routes/Login'))],
  ['/', lazy(() => import('./routes/Home'))],
];

render(
  <React.StrictMode>
    <Router>
      <AuthContainer.Provider>
        <Link to='/'>my games</Link>
        <Link to='/browse'>browse</Link>
        <Link to='/login'>login</Link>

        {/* TODO add proper fallback */}
        <React.Suspense fallback={<div>loading...</div>}>
          <Switch>{routes.map(makeRoute)}</Switch>
        </React.Suspense>
      </AuthContainer.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

function makeRoute([path, component]: RouteInfo) {
  return <Route key={path} path={path} component={component} />;
}
