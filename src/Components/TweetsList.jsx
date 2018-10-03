import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class TweetsList extends Component {
  
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

  render() {
    let allTweets = this.props.allTweets || [];
    return(
      <div>
        {this.props.isLoading ? <span>Loading..</span> : 
          allTweets.map((tweet)=>{
            return(
              <div class="card">
                <div class="card-body row">
                  <span class="user-img col-md-1">
                    <img src={tweet.user.profile_image_url}/>
                  </span>
                  <span class="col-md-11">
                    <div className="row">
                      <div className="col-md-11">
                       <Link to={`/singletweet?id=${tweet.id_str}`}  target="_blank"> <h5 class="card-title">{tweet.user.name}<span>@{tweet.user.screen_name}</span>
                        </h5></Link> 
                      </div>
                      <div className="col-md-1">
                        <span className="star-icon" title="add to favourite tweet" onClick={()=>this.favTweet(tweet.id_str)}><i class="fas fa-star"></i></span>
                      </div>
                    </div>
                  <p class="card-text">
                     {tweet.text}
                  </p>
                  <span class="feature-bar">
              <span class="retweet">
                <i class="fa fa-retweet"></i>
                <span className="retweet-count">{tweet.retweet_count}</span>
              </span>
              </span>
                </span>     
              </div>
              </div>
            )
          })
        }
      </div>
    ) 
  }
}
