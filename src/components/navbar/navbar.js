import React, { Component } from 'react';
import Media from 'react-media';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import logo from '../images/logo-no-text.svg';
import profile from '../images/profile-icon.svg';
import book from '../images/book.png';
import login from '../images/sign-in.png';
import SignIn from '../navbar/login/login';

class Navbar extends Component {
        constructor(){
            super()

        }

    render() {

        return (
            <div className='nb-page'>
                <Media query='(max-width: 400px)'>
                    {matches =>
                        matches ? (
                            <div className='nb-mobile'>
                                <Link to='/input'><div className="nb-logo-mobile">
                                    <img className="nb-logo" src={logo} alt="fridge-raiders"/>
                                    <h3 className='nb-title'>fridge-raiders</h3>
                                </div>
                                </Link>
                                <div className="nb-bottom">
                                <Link to='/cookbook'><img src={book} className="nb-icon-book" alt=''/></Link>
                                    <Link to='/profile'><img src={profile} className='nb-icon-profile' alt=''/></Link>
                                    <Popup trigger={<img src={login} className='nb-icon-login' alt=''/>} modal>
                                    <SignIn/>
                                    </Popup>
                                </div>
                            </div>
                        ) : (
                            <div className='nb-large-screen'>
                                <Link to='/input'><div className='nb-logo-mobile large'>
                                <img className='nb-logo' src={logo} alt="fridge-raiders"/>
                                    <h3 className='nb-title'>fridge-raiders</h3>
                                </div></Link>
                                <div className='nb-menu'>
                                    <Link to='/cookbook'><h3 className='nb-book'>cookbook</h3></Link>
                                    <Link to='/profile'><h3 className='nb-profile'>profile</h3></Link>
                                    <Popup trigger={<h3 className='nb-login'> login</h3>} modal>
                                    <SignIn/>
                                    </Popup>
                                </div>
                                </div>
                            )
                    }
                </Media>
            </div>
        )
    }
}

export default Navbar;

//source for login popup w/multi inputs https://sweetalert2.github.io/#multiple-inputs