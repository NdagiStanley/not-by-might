import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

import Login from './components/Login';

let Home = React.createClass({
  render() {
    console.log(this);
    return (
      <div>Welcome to Home</div>
    );
  }
});

let App = React.createClass({
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <br/>
        <br/>
        <Link to="/login">Login</Link>
        <br />
        <br />
        {this.props.children}
      </div>
    );
  }
});

let routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="login" component={Login}></Route>
      <Route path="login" component={Login}></Route>
    </Route>
  </Router>)

console.log(Login)
render(routes , document.getElementById('react'));
