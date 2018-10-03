import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default class Profile extends Component {
  state={
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
            console.log(res, 'response');
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
                "Favourite Tweets"
                  // display favourite tweets here same technique used in tweets list.
                
                }
              </div>
            </div>
            </div>
          </div>
        )
      }
    }