import React, { Component } from 'react'
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';


export default class Signup extends Component {
  state={
    isLoading:false,
  }
  onSubmit = ()=>{
    this.setState({isLoading:true});
    let data ={
      fname:this.refs.fname.value,
      lname:this.refs.lname.value,
      email:this.refs.email.value,
      username:this.refs.username.value,
      password:this.refs.password.value
    };
    axios.request({
      method: 'POST',
      url: 'http://localhost:4444/signup',  
      data: data
    }).then((res)=>{  
      localStorage.setItem("token", res.data.token);
      this.setState({isLoading:false});

    }).catch((err)=>{
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
      <div class="container">
			<div class="sign-up">
				<div class="">
					<form class="form-horizontal">
						
						<div class="form-group">
							<label for="name" class="cols-sm-2 control-label">First Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="text" class="form-control" name="name" ref="fname"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

            <div class="form-group">
							<label for="name" class="cols-sm-2 control-label">Last Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="text" class="form-control" name="name" ref="lname"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="email" class="cols-sm-2 control-label">Your Email</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="text" class="form-control" name="email" ref="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">Username</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="text" class="form-control" name="username" ref="username"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="password" class="form-control" name="password" ref="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<input type="password" class="form-control" name="confirm" ref="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group ">
							<button type="button" class="btn btn-primary btn-lg btn-block login-button" onClick={this.onSubmit} disabled={this.state.isLoading}>Register</button>
						</div>
						<div class="login-register">
				      <Link to="/login">Login</Link>
				    </div>
					</form>
				</div>
			</div>
		</div>
    )
	}
  }
}