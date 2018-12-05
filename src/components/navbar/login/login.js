import React, {Component} from 'react';
import axios from 'axios';

class SignIn extends Component{
    constructor(){
        super()
        this.state={
            username: '',
            password: ''
        }
    }

    handleUsername(value){
        this.setState({username: value})
    }

    handlePassword(value){
        this.setState({password: value})
    }

    login(username,password){
        axios.post('/auth/login',{username,password})
    }

    register(username,password){
        axios.post('/auth/register',{username,password})
    }



    render(){
        let {username, password} = this.state;
        return(
            
            <div>
              <h3>username</h3><br/>
              <input type="text" onChange={e=>this.handleUsername(e.target.value)}/><br/>
              <h3>password</h3><br/>
                <input type="text" onChange={e=>this.handlePassword(e.target.value)}/><br/>
                <button onClick={()=>this.login(username,password)}>login</button>
                <button onClick={()=>this.register(username,password)}>register</button>
            </div>
        )
    }
}

export default SignIn;