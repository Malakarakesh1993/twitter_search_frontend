import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import TweetsList from '../Components/TweetsList';
import Pagination from '../Components/Pagination';

export default class Home extends Component {
  state={
    tweets:[],
    isLoading:false,
    sinceID:'',
    maxID:'',
    keyword:'',
    nextDisable:false,
    prevDisable:false
  }

  toggleLoading = (status) =>{
    this.setState({isLoading:status});
  }
  getTweets = (tweets) => {

    this.setState({tweets:tweets.statuses,isLoading:false,keyword:tweets.search_metadata.query});
    if(tweets.search_metadata.hasOwnProperty('next_results')) {
      let max_id_str = tweets.search_metadata.next_results.split('max_id=')[1].split('&')[0];
      this.setState({maxID:max_id_str,nextDisable:true});
    }
    
    if(tweets.search_metadata.hasOwnProperty('refresh_url')) {
      let since_id_str = tweets.search_metadata.refresh_url.split('since_id=')[1].split('&')[0];
      this.setState({sinceID:since_id_str,prevDisable:true});
    }
  }

  render() {

    if(!localStorage.getItem("token")){
        return(<Redirect to="/login"/>);
    }else{
    return (
      <div>
        <NavBar/>
        <div className="container">
          <SearchBar  getTweets={this.getTweets} toggleLoading={this.toggleLoading}/>
          <Pagination getTweets={this.getTweets} toggleLoading={this.toggleLoading} maxID={this.state.maxID} sinceID={this.state.sinceID} keyword={this.state.keyword} nextDisable={this.state.nextDisable} prevDisable={this.state.prevDisable}/>          
          <TweetsList allTweets={this.state.tweets} isLoading={this.state.isLoading}/>
        </div> 
      </div>
    )
  }
  }
}
