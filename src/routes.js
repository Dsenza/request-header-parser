import React from 'react';
import {Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';


import App from "./App";
import Something from "./components/Something";
import About from './components/About';
import Projects from './components/Projects';
import CamperTableContainer from './containers/CamperTableContainer';
import CounterContainer from './containers/CounterContainer';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Something}/>
    <Route path="/about" component={About}/>
    <Route path="/projects" component={Projects}/>
    <Route path="/leaderboard" component={CamperTableContainer}/>
    <Route path="/test" component={CounterContainer}/>
  </Route>
)