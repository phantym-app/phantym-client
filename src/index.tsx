import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import "./global.css"

// lazy importing routes
const Main = React.lazy(() => import("./routes/Main"))
const Foo = React.lazy(() => import("./routes/Foo"))

const Navigator = () => (
  <Router>
    <Link to="/">home</Link>
    <Link to="/foo">foo</Link>

    <React.Suspense fallback={<div>loading</div>}>
      <Switch>
        <Route path="/foo" component={Foo} />
        <Route path="/" component={Main} />
      </Switch>
    </React.Suspense>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Navigator />
  </React.StrictMode>,
  document.getElementById("root")
)
