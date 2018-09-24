import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Pages/Router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
