import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component{
    render(){
        return(
            <div className='landing-page'>
                <h1 className="landing-title">what's in your fridge?</h1>
                <img src='https://s3-us-west-1.amazonaws.com/fridgeraiders/bg-image.png' alt=''/>
                <h2 className='landing-sub'>find recipes based on what you have in your kitchen</h2>
                <Link to='/'><button className="landing-button">enter</button></Link>
            </div>
        )
    }
}

export default Landing;