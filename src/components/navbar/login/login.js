import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUserData} from '../../../ducklings/reducer';

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

    async login(username,password){
    await axios.post('/auth/login',{username,password}).then(res=>{this.props.updateUserData(res.data)});
        // console.log('ses',this.props.user)
    // await axios.post('/auth/login',{username,password})
    // const session = await axios.get('/auth/getUser');
    // await this.props.updateUserData(session.data);
    // await this.props.history.push('/input');

    }

    async register(username,password){
    await axios.post('/auth/register',{username,password})
    const session = await axios.get('/auth/getUser');
    console.log('user',session.data)
    await this.props.updateUserData(session.data);
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

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps,{updateUserData})(SignIn);