import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import TweetsList from '../Components/TweetsList';

export default class Home extends Component {
  state={
    tweets:[],
    isLoading:false,
  }

  toggleLoading = (status) =>{
    this.setState({isLoading:status});
  }
  getTweets = (tweets) => {
    this.setState({tweets:tweets,isLoading:false});
  }

  render() {

    console.log(this.state.tweets,"tweets from home");
    if(!localStorage.getItem("token")){
        return(<Redirect to="/login"/>);
    }else{
    return (
      <div>
        <NavBar/>
        <div className="container">
          <SearchBar  getTweets={this.getTweets} toggleLoading={this.toggleLoading}/>
          <TweetsList allTweets={this.state.tweets} isLoading={this.state.isLoading}/>
        </div> 
      </div>
    )
  }
  }
}
