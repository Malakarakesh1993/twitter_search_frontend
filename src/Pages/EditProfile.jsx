import React, { Component } from 'react'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default class EditProfile extends Component {
    state={
        previewImg:"",
        fname:'',
        lname:'',
        desc:'',
        add:'',
        contact:'',
        orgAdd:'',
        hobby:'',
        favFood:'',
        skills:'',
        imgUrl:'',
        isRedirect:false,
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
                fname:res.data.data.firstname, 
                lname:res.data.data.lastname, 
                desc:res.data.data.description, 
                add:res.data.data.address, 
                contact:res.data.data.contact, 
                orgAdd:res.data.data.organization_address, 
                hobby:res.data.data.hobby, 
                favFood:res.data.data.favorite_food, 
                skills:res.data.data.skills, 
                imgUrl:res.data.data.imgUrl, 
                previewImg:res.data.data.image_url,
                isLoading:false
            });      
          }).catch((err)=>{
            this.setState({isLoading:false});
          })
    }

    handleChange (event) {
      this.setState( {[event.target.name]: event.target.value });
    }

    formSubmit = (event) =>{
        event.preventDefault();
        let data = {
            fname : this.state.fname,
            lname : this.state.lname,
            desc : this.state.desc,
            add : this.state.add,
            contact: this.state.contact,
            orgAdd : this.state.orgAdd,
            hobby : this.state.hobby,
            favFood : this.state.favFood,
            skills : this.state.skills,
            imgUrl: this.state.previewImg,
            token: localStorage.getItem('token')
        }
        axios.request({
            method: 'POST',
            url: 'http://localhost:4444/editprofile',  
            data: data
          }).then((res)=>{  
            this.setState({isLoading:false,isRedirect:true});
      
          }).catch((err)=>{
            console.log("api call unsucessfull",err);
            this.setState({isLoading:false});
          })
    }
    imgUpload = (e)=>{
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            this.setState({previewImg:e.target.result});
        }
    }
    render(){
        if(this.state.isRedirect) {
            return( <Redirect to="/profile"/>)
        }else {
            return(
            <div>
                <NavBar/>
                <div className='container'>
                    <h3>Edit profile</h3>
                    <form onSubmit={this.formSubmit}>
                        <div class="form-group">
                            <label for="fname">First Name</label>
                            <input type="text" class="form-control" name="fname" placeholder="Enter First Name" value={this.state.fname} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="lname">Last Name</label>
                            <input type="text" class="form-control" name="lname" placeholder="Enter Last Name" value={this.state.lname} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="desc">Description</label>
                            <textarea class="form-control" name="desc" rows="3" onChange={event => this.handleChange(event)} value={this.state.desc} />
                        </div>
                        <div class="form-group">
                            <label for="add">Address</label>
                            <input type="text" class="form-control" name="add" placeholder="Enter Address" value={this.state.add} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="contact">Contact No.</label>
                            <input type="text" class="form-control" name="contact" placeholder="Enter Contact No." value={this.state.contact} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="org-add">Organization Address</label>
                            <input type="text" class="form-control" name="orgAdd" placeholder="Enter work address" value={this.state.orgAdd} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="hobby">Hobby</label>
                            <input type="text" class="form-control" name="hobby" placeholder="Enter Hobby" value={this.state.hobby} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="favfood">Favourite Food</label>
                            <input type="text" class="form-control" name="favFood" placeholder="Enter your favourite food" value={this.state.favFood} onChange={event => this.handleChange(event)}/>
                        </div>
                        <div class="form-group">
                            <label for="skills">Skills</label>
                            <input type="text" class="form-control" name="skills" placeholder="Enter skills" value={this.state.skills} onChange={event => this.handleChange(event)}/>
                        </div>
                        <input type="file" name="file" onChange={this.imgUpload}/>
                        {this.state.previewImg ? <div className="img-preview">
                            <img src={this.state.previewImg}/><br/>
                        </div> : <p></p>}
                        <div className="submit-btn">
                            <input class="btn btn-primary" type="submit" name="submit" value="submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
        } 
    }
}