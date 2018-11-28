import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import Image from 'bg-image.png';

class Landing extends Component{
    render(){
        return(
        <Grid container spacing={24}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <div className='landing-page'>
                    <h1 className="landing-title">what's in your fridge?</h1>
                    <img className='landing-image' src='https://s3-us-west-1.amazonaws.com/fridgeraiders/bg-image.png' alt='purple peppers'/>
                    <h2 className='landing-sub'>find recipes based on what you have in your kitchen</h2>
                    <Link to='/'><button className="landing-button">enter</button></Link>
                </div>
            
            </Grid>
        </Grid>
        )
    }
}

export default Landing;