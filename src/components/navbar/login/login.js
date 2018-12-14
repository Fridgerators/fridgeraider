import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import login from '../../images/login.svg';
import register from '../../images/register.svg';
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
        await axios.post('/auth/login',{username,password}).then(res=>{this.props.updateUserData(res.data)}).catch(()=>{
                swal('please enter the correct username and/or password')
        })
     }
     
        async register(){
        let {username, password} = this.state
            if(username.length < 5 || password.length<5){
                let jiggle = document.querySelector('.warning-text')
                jiggle.classList.add('shake');
                setTimeout(() => {
                    jiggle.classList.remove('shake');
                }, 900)

            }else{
        await axios.post('/auth/register',{username,password}).then(session=>{
            this.props.updateUserData(session.data)
        }).catch((err)=>{
            console.log('err',err)
            swal('please select a different username')
        })}
        }



    render(){
        let {username, password} = this.state;
        return(
            
            <div className='login-box'>
              <h3>username</h3>
              <input type="text" onChange={e=>this.handleUsername(e.target.value)}/><br/>
              <h6>at least 5 characters each please</h6>
              <h3>password</h3>
                <input type="text" onChange={e=>this.handlePassword(e.target.value)}/><br/>
              <h6 className='warning-text'>at least 5 characters please</h6>
                <img src={register} onClick={()=>this.register(username,password)} alt="click to register"/>
                <img src={login} onClick={()=>this.login(username,password)} alt="click to login"/>
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