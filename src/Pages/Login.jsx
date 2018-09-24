import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
export default class Login extends Component {
  state={
    isLoading:false,
    isError:false,
    unAuthorized:false,
    usernameError:false,
    passwordError:false,
  }

  /* validation checks */
  usernameCheck =(e)=>{
    if(e.target.value === ""){
        this.setState({usernameError:true});
    }
  }
  usernameFocus =(e)=>{
    this.setState({usernameError:false});
  }
  passwordCheck =(e)=>{
    if(e.target.value === ""){
        this.setState({passwordError:true});
    }
  }
  passwordFocus =(e)=>{
    this.setState({passwordError:false});
  }

  /* on form submit */
  formSubmit = (event) =>{
    this.setState({isLoading:true});
    event.preventDefault();

    /* login fields empty validation check, return if empty */
    if(this.refs.username.value === "" && this.refs.username.value === ""){
        this.setState({usernameError:true,passwordError:true,isLoading:false});
        return;
    }
    let formData = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    // let data = JSON.stringify(formData);

    /* make API call to receive access token from server */
    axios.request({
      method: 'POST',
      url: 'http://localhost:4444/user_authenticate',
    //   headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-credentials':'true'
    //   },
        data: formData
    }).then((res)=>{  
      console.log("api call sucessfull",res);
      localStorage.setItem("token", res.data.token);
      this.setState({isLoading:false});

    }).catch((err)=>{
      console.log("api call unsucessfull",err.response.status);
      if(err.response.status===401){
          this.setState({unAuthorized:true});
      }else{
          this.setState({isError:true});
      }
      this.setState({isLoading:false});
    })
  }
  render() {
        let token = localStorage.getItem("token") || "";
        /* check token existence only for now, no token verification */
        if(token.length > 0){
           return( <Redirect to="/home"/>)
        }else{
            return (
                <div id="login">
                  <div class="container">
                      <div id="login-row" class="row justify-content-center align-items-center">
                          <div id="login-column" class="col-md-6">
                              <div id="login-box" class="col-md-12">

                               {/*check if unauthorized, display validation message accordingly */}

                              {this.state.unAuthorized ? 
                            <span className="error-msg align-items-center">Username or Password Incorrect</span> : ""}
                                {this.state.isError ? <span className="error-msg align-items-center">Something went wrong</span> : ""}
                                  <form id="login-form" class="form" onSubmit={this.formSubmit}>
                                      <h3 class="text-center text-info">Login</h3>
                                      <div class="form-group">
                                          <label for="username" class="text-info">Username:</label><br/>
                                          <input type="text" ref="username" id="username" class="form-control" onBlur={this.usernameCheck} onFocus={this.usernameFocus}/>
                                          {this.state.usernameError ? <span className="error-msg">Username Cannot be Empty</span> : ""}
                                      </div>
                                      <div class="form-group">
                                          <label for="password" class="text-info">Password:</label><br/>
                                          <input type="text" ref="password" id="password" class="form-control" type="password" onBlur={this.passwordCheck} onFocus={this.passwordFocus}/>
                                          {this.state.passwordError ? <span className="error-msg">Password Cannot be Empty</span> : ""}
                                      </div>
                                      <div class="form-group">
                                          {this.state.isLoading ? 'loading' : <input type="submit" name="submit" class="btn btn-info btn-md" disabled={this.state.usernameError ||this.state.passwordError} value="submit"/>}
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              )
        }     
    } 
}
