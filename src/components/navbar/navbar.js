import React, { Component } from 'react';
import Media from 'react-media';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
import swal from 'sweetalert2';
import logo from '../images/logo-no-text.svg';
import profile from '../images/profile-icon.svg';
import book from '../images/book.png';
import login from '../images/sign-in.png';
import SignIn from '../navbar/login/login';
import {updateUserData} from '../../ducklings/reducer';

class Navbar extends Component {
    constructor() {
        super()
        this.logout=this.logout.bind(this);
    }

    logout() {
    axios.get('/auth/logout')
    this.props.updateUserData({empty:'empty'}) 
    }

    handleWarning(){
        swal("please login or register")
    }

    render() {
        return (
            <div className='nb-page'>
                <Media query='(max-width: 400px)'>
                    {matches =>
                        matches ? (
                            <div className='nb-mobile'>
                                <Link to='/input'><div className="nb-logo-mobile">
                                    <img className="nb-logo" src={logo} alt="fridge-raiders" />
                                    <h3 className='nb-title'>fridge-raiders</h3>
                                </div>
                                </Link>
                                <div className="nb-bottom">
                                {this.props.user.empty === 'empty'?
                                <div>
                                <img onClick={this.handleWarning} src={book} className="nb-icon-book" alt='' />
                                <img onClick={this.handleWarning} src={profile} className='nb-icon-profile' alt='' />
                                <Popup trigger={<img src={login} className='nb-icon-login' alt='' />} modal>
                                            <SignIn />
                                        </Popup>
                                </div>
                                :<div>
                                    <Link to='/cookbook'><img src={book} className="nb-icon-book" alt='' /></Link>
                                    <Link to='/profile'><img src={profile} className='nb-icon-profile' alt='' /></Link>
                                    <Link to='./input'><img src={login} className='nb-icon-login' alt='' onClick={this.logout}/></Link>
                                    </div>
                                }
                                    
                                    {/* 
                                    <Popup trigger={<img src={login} className='nb-icon-login' alt='' />} modal>
                                        <SignIn />
                                    </Popup> */}
                                </div>
                            </div>
                        ) : (
                                <div className='nb-large-screen'>
                                    <Link to='/input'><div className='nb-logo-mobile large'>
                                        <img className='nb-logo' src={logo} alt="fridge-raiders" />
                                        <h3 className='nb-title'>fridge-raiders</h3>
                                    </div></Link>
                                    <div className='nb-menu'>
                                    {this.props.user.empty === 'empty'?
                                    <div>
                                    <h3 className='nb-book' onClick={this.handleWarning}>cookbook</h3>
                                    <h3 className='nb-profile' onClick={this.handleWarning}>profile</h3>
                                    <Popup trigger={<h3 className='nb-login'> login</h3>} modal>
                                            <SignIn />
                                        </Popup>
                                    </div>
                                    :<div>
                                        <Link to='/cookbook'><h3 className='nb-book'>cookbook</h3></Link>
                                        <Link to='/profile'><h3 className='nb-profile'>profile</h3></Link>
                                        <Link to='/input' onClick={this.logout}>logout</Link>
                                        </div>

                                    }
                                        {/* 
                                            <Popup trigger={<h3 className='nb-login'> login</h3>} modal>
                                                <SignIn />
                                            </Popup> */}
                                    </div>
                                </div>
                            )
                    }
                </Media>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {user} = state;
    return{
        user
    }
}

export default connect(mapStateToProps, {updateUserData})(Navbar);
