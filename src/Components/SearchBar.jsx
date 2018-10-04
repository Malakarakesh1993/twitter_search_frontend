import React, { Component } from 'react'
import axios from 'axios';

export default class SearchBar extends Component {
  state={
    isError:false
  }
  searchFocus =(e)=>{
    this.setState({isError:false});
  }
  /* on search form submit */
  getTweets = (event) =>{
    let token = localStorage.getItem("token");

    this.props.toggleLoading(true);
    event.preventDefault();
    let keyword = this.refs.search.value;

    /* login fields empty validation check, return if empty */
    if(keyword === ""){
        this.setState({isError:true});
        this.props.toggleLoading(false);
        return;
    }
    // let data = JSON.stringify(formData);
    axios.request({
      method: 'POST',
      url: 'http://localhost:4444/api/',
      headers: {
        'Authorization': token
      },
      data: {
        keyword: keyword
      },
    
    }).then((res)=>{  
    
      this.props.getTweets(res.data);
      this.props.toggleLoading(false);
    }).catch((err)=>{

      this.props.toggleLoading(false);
    })
  }

  render() {
    return (
        <div class="row justify-content-center">
        <div class="col-12">
            <form class="card card-sm blue-bg" onSubmit={this.getTweets}>
            {/* this.state.isError ? <span className="error-msg">Keyword Cannot be Empty</span> : "" */}
                <div class="card-body row no-gutters align-items-center">
                    <div class="col-auto">
                        {/* <i class="fas fa-search h4 text-body"></i> */}
                    </div>
                    <div class="col">
                        <input class="form-control form-control-lg form-control-borderless" ref="search" type="search" placeholder="Enter keywords to find tweets" onFocus={this.searchFocus}/>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-lg btn-success" type="submit">Search</button>
                    </div>
                </div>
                {
                  this.state.isError ? <span className="error-msg keyword-margin">Keyword Cannot be Empty</span> : ""
                }
            </form>
        </div>
    </div>
    )
  }
}
