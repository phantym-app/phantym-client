import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './global.scss';

type LazyRoute = React.LazyExoticComponent<() => JSX.Element>;
type routeInfo = [string, LazyRoute];

// lazy route imports
const routes: routeInfo[] = [
  ['/browse', lazy(() => import('./routes/Browse'))],
  ['/login', lazy(() => import('./routes/Login'))],
  ['/', lazy(() => import('./routes/Home'))],
];
  
const makeRoute = ([p, c]: routeInfo) => <Route key={p} path={p} component={c} />;

const Navigator = () => (
  <Router>
    <Link to='/'>my games</Link>
    <Link to='/browse'>browse</Link>

    {/* TODO add proper fallback */}
    <React.Suspense fallback={<div>loading...</div>}>
      <Switch>{routes.map(makeRoute)}</Switch>
    </React.Suspense>
  </Router>
);

// app entry
ReactDOM.render(
  <React.StrictMode>
    <Navigator />
  </React.StrictMode>,
  document.getElementById('root'),
);
