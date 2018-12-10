import React, {Component} from 'react';
import axios from 'axios';
import login from '../../images/login.svg';
import register from '../../images/register.svg';


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
            
            <div className='login-box'>
              <h3>username</h3>
              <input type="text" onChange={e=>this.handleUsername(e.target.value)}/><br/>
              <h3>password</h3>
                <input type="text" onChange={e=>this.handlePassword(e.target.value)}/><br/>
                <img src={register} onClick={()=>this.register(username,password)} />
                <img src={login} onClick={()=>this.login(username,password)} />
            </div>
        )
    }
}

export default SignIn;