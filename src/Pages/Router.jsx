import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Main from './Main';
import Signup from './Signup';
import Profile from './Profile';
import EditProfile from './EditProfile'
import SingleTweet from './SingleTweet'

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>  
        <Route exact path="/login" component={Login}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/editprofile" component={EditProfile}/>
        <Route exact path="/singletweet" component={SingleTweet}/>
      </Switch>
    )
  }
}
