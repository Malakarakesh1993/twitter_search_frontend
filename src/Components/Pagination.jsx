import React, { Component } from 'react';
import '../buttons.css';
import axios from 'axios';

export default class Pagination extends Component {

  /* on next click */
  nextTweets = (event) =>{
    let token = localStorage.getItem("token");
    event.preventDefault();
    axios.request({
      method: 'POST',
      url: `http://localhost:4444/api`,
      headers: {
        'Authorization': token
      },
      data: {
        maxID: this.props.maxID,
        keyword: this.props.keyword
      },
    
    }).then((res)=>{  
      console.log("next api call sucessfull",res);
      this.props.getTweets(res.data);
      this.props.toggleLoading(false);
    }).catch((err)=>{
      console.log("next api call unsucessfull",err);

      this.props.toggleLoading(false);
    })
  }

  previousTweets = (event) =>{
    let token = localStorage.getItem("token");
    event.preventDefault();
    axios.request({
      method: 'POST',
      url: `http://localhost:4444/api`,
      headers: {
        'Authorization': token
      },
      data: {
        sinceID: this.props.sinceID,
        keyword: this.props.keyword
      },
    
    }).then((res)=>{  
      console.log("previous api call sucessfull",res);
      this.props.getTweets(res.data);
      this.props.toggleLoading(false);
    }).catch((err)=>{
      console.log("previous api call unsucessfull",err);

      this.props.toggleLoading(false);
    })
  }

  render() {
    return (
        <div class="row justify-content-center">
          <a href="#" class="previous" onClick={this.previousTweets} disabled={this.props.prevDisable}>&laquo; Previous</a>
          <a href="#" class="next" onClick={this.nextTweets} disabled={this.props.nextDisable}>Next &raquo;</a>
        </div>
    )
  }
}
