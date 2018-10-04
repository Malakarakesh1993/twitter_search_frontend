import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default class TweetsList extends Component {
    state={
        tweet:{},
        isLoading:true,
    }
    favTweet = (id)=>{
      axios.request({
        method: 'POST',
        url: 'http://localhost:4444/favTweet',  
        data: {
          id: id,
          token: localStorage.getItem('token')
        }
      }).then((res)=>{  
        alert('Added to favorites');
        this.setState({isLoading:false});

      }).catch((err)=>{
        alert('Error encountered' + err.message);
        this.setState({isLoading:false});
      })
    }
    componentDidMount(){
        var tweet_id  = window.location.search.split("id=")[1];
        axios.request({
            method: 'POST',
            url: 'http://localhost:4444/fetchSingleTweet', 
            data:{
                tweet_id: tweet_id,
                token: localStorage.getItem('token')
            },
        }).then((res)=>{  
            
            this.setState({tweet:res.data,isLoading:false});     
        }).catch((err)=>{
            this.setState({isLoading:false});
        });
    }
    render(){
        let tweet = this.state.tweet || {};
        if(this.state.isLoading){
            return(<h1>loading...</h1>);
        }else{
        return(
          <div>
          <NavBar/>
          <div class="card">
                <div class="card-body row">
                  <span class="user-img col-md-1">
                    <img src={tweet.user.profile_image_url ? tweet.user.profile_image_url:""}/>
                  </span>
                  <span class="col-md-11">
                    <div className="row">
                      <div className="col-md-11">
                       <h5 class="card-title">{tweet.user.name || ""}<span>@{tweet.user.screen_name || ""}</span>
                        </h5>
                      </div>
                      <div className="col-md-1">
                        <span className="star-icon" title="add to favourite tweet" onClick={()=>this.favTweet(tweet.id_str)}><i class="fas fa-star"></i></span>
                      </div>
                    </div>
                  <p class="card-text">
                     {tweet.text || ""}
                  </p>
                  <span class="feature-bar">
              <span class="retweet">
                <i class="fa fa-retweet"></i>
                <span className="retweet-count">{tweet.retweet_count || ""}</span>
              </span>
              </span>
                </span>     
              </div>
              </div>
              </div>
          )}
    }

}