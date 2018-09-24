import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Main from './Main';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>  
        <Route exact path="/login" component={Login}/>
        <Route exact path="/home" component={Home}/>
      </Switch>
    )
  }
}
