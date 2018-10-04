import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default class Profile extends Component {
  state={
    isLoading:true,
    isFavTweetsActive:false,
    isBasicInfoActive:true,
    showBasicInfo:true,
    showFavTweets:false,
    profileData:[],
    favoriteTweets:[]
  }
  basicInfo = ()=>{
    this.setState({
      isFavTweetsActive:false,
      isBasicInfoActive:true,
      showBasicInfo:true
    });  
  }
  favTweets =() =>{
    //get Favourite tweets list here with axios
    this.setState({
      isFavTweetsActive:true,
      isBasicInfoActive:false,
      showFavTweets:true,
      showBasicInfo:false
    });
  }
  componentDidMount(){
        axios.request({
            method: 'POST',
            url: 'http://localhost:4444/fetchProfile', 
            data:{
                token: localStorage.getItem('token')
            },
          }).then((res)=>{  
            this.setState({
                profileData:res.data.data,isLoading:false
            });      
          }).catch((err)=>{
            this.setState({isLoading:false});
          });

          /* fetch favorite tweets */
          axios.request({
            method: 'POST',
            url: 'http://localhost:4444/fetchFavoriteTweets', 
            data:{
                token: localStorage.getItem('token')
            },
          }).then((res)=>{  
            this.setState({favoriteTweets:res.data.data,isLoading:false})
          }).catch((err)=>{
            this.setState({isLoading:false});
          });
    }

    render(){
        return(
          <div>
            <NavBar/>
            <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="sidebar">
                  <div className="profile-pic">
                    <img src={this.state.profileData.image_url} alt=""/>
                  </div>
                  <div className="userInfo">
                    <span className="fullName">{this.state.profileData.firstname}&nbsp;{this.state.profileData.lastname}</span> 
                    <span className="username">@{this.state.profileData.username}</span>
                    <div className="description">
                      {this.state.profileData.description}
                    </div>
                  </div>
                </div>
                <div className="edit-profile-btn">
                  <Link to="editprofile" class="btn btn-primary btn-lg active">
                    Edit Profile
                  </Link>
                </div>
              </div>
              <div className="col-md-9">
                <ul className="nav nav-pills nav-fill bg-white">
                  <li className="nav-item">
                    <a className={this.state.isBasicInfoActive ? 'nav-link active' : 'nav-link'} href="#" onClick={this.basicInfo}>Basic Info</a>
                  </li>
                  <li className="nav-item">
                    <a className={this.state.isFavTweetsActive ? 'nav-link active' : 'nav-link'} href="#" onClick={this.favTweets}>Favourite Tweets</a>
                  </li>
                </ul>
                {this.state.showBasicInfo ? 
                <div className="basic-info">
                    <ul className="list-group">
                    <li className="list-group-item"><b>Address</b>: {this.state.profileData.address}</li>
                    <li className="list-group-item"><b>Work Address</b>: {this.state.profileData.organization_address}</li>
                    <li className="list-group-item"><b>Hobby</b>: {this.state.profileData.hobby}</li>
                    <li className="list-group-item"><b>Skills</b>: {this.state.profileData.skills}</li>
                    <li className="list-group-item"><b>Contact No.</b>: {this.state.profileData.contact}</li>
                    <li className="list-group-item"><b>Favourite Food</b>: {this.state.profileData.favorite_food}</li>
                  </ul>
                </div>:
                  
                    this.state.favoriteTweets.map((tweet) => {
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
            </div>
            </div>
          </div>
        )
      }
    }