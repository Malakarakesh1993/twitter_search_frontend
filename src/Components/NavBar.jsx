import React, { Component } from 'react'
import {History,Redirect,Link} from 'react-router-dom';

export default class NavBar extends Component {
  state={
    redirect:false
  }
  logOut = ()=>{
    localStorage.clear();
    this.setState({redirect:true});

  }
  render() {
    if(this.state.redirect){
      return(<Redirect to="/login"/>);
    }else{

    return (
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <Link class="my-0 mr-md-auto font-weight-normal" to="/home">Home</Link>
      <Link class="btn btn-outline-primary margin-right-11" to="/profile">My profile</Link>
      <a class="btn btn-outline-primary" onClick={this.logOut}>log out</a>
    </div>
    )
    }
  }
}
