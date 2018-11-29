import React, { Component } from 'react';
import Media from 'react-media';
import logo from '../images/logo-no-text.svg';
import profile from '../images/profile-icon.svg';
import book from '../images/book.png';
import login from '../images/sign-in.png';

class Navbar extends Component {
    render() {
        return (
            <div className='nb-page'>
                <Media query='(max-width: 400px)'>
                    {matches =>
                        matches ? (
                            <div className='nb-mobile'>
                                <div className="nb-logo-mobile">
                                    <img className="nb-logo" src={logo} alt="fridge-raiders"/>
                                    <h3 className='nb-title'>fridge-raiders</h3>
                                </div>
                                <div className="nb-bottom">
                                    <img src={book} className="nb-icon-book" />
                                    <img src={profile} className='nb-icon-profile' />
                                    <img src={login} className='nb-icon-login' />
                                </div>
                            </div>
                        ) : (
                            <div className='nb-large-screen'>
                                <div className="nb-logo">
                                    <img className="nb-logo" src={logo} alt="fridge-raiders"/>
                                    <h3 className='nb-title'>fridge-raiders</h3>
                                </div>
                                <div className='nb-menu'>
                                    <h3 className='nb-menu-item'>cookbook</h3>
                                    <h3 className='nb-profile'>profile</h3>
                                    <h3 className='nb-login'> login</h3>
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