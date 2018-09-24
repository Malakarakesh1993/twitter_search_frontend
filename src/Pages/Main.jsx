import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

/* main router handler from default root route */

export default class Main extends Component {

  render() {
      let token = localStorage.getItem("token") || "";
      /* only check existence of token for now */
      if(!token.length){
          return (<Redirect to="/login"/>);
      }else{
          return(<Redirect to="/home"/>);
      }
    
  }
}
