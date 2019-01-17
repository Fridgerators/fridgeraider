import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from './logo-with-text.svg';

class Landing extends Component{

    render(){
        return(
                <div className='landing-page'>
                    <div className='landing-content'>
                        <img className='landing-title' src={logo} alt=""/>
    
                        <h2 className='landing-sub'>find recipes based on what you have in your kitchen</h2>
                        <Link to='/input'><button className='landing-button'>enter</button></Link>
                    </div>
                </div>
           
        )
    }
}

export default Landing;