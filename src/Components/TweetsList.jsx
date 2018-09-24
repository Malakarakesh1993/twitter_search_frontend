import React, { Component } from 'react'

export default class TweetsList extends Component {
  
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
                  <h5 class="card-title">{tweet.user.name}<span>@{tweet.user.screen_name}</span>
                  </h5>
                    
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
