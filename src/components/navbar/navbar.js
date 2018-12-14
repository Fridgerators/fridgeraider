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
import logout from '../images/sign-out.png';

class Navbar extends Component {
    constructor() {
        super()
        this.state={
            bookReport:[]
        }

        this.logout=this.logout.bind(this);
        this.handleCookbook=this.handleCookbook.bind(this);
    }

    logout() {
    axios.get('/auth/logout')
    this.props.updateUserData({empty:'empty'}) 
    swal({
        title: "logging out",
        showConfirmButton: false,
        timer: 500
    })
    }

    async handleCookbook(){
       let res=  await axios.get('/api/cookbook/recipeList')
        await this.setState({ bookReport: res.data})
            if(this.state.bookReport.length){
                window.location='/#/cookbook';
            }else{
                swal('your cookbook is currently empty')
            }
    }

    render() {
        console.log("pagename",this.state.pageName)
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
                                <Popup trigger= {<img src={book} className="nb-icon-book" alt='go to saved recipes' />}modal><SignIn /></Popup>
                                <Popup trigger={<img  src={profile} className='nb-icon-profile' alt='go to profile' />} modal><SignIn/></Popup>
                                <Popup trigger={<img src={login} className='nb-icon-login' alt='' /> } modal><SignIn /></Popup>                                            
                                </div>
                                :<div>
                                    <img onClick={this.handleCookbook} src={book} className="nb-icon-book" alt='' />
                                    <Link to='/profile'><img src={profile} className='nb-icon-profile' alt='' /></Link>
                                    <Link to='./input'><img src={logout} className='nb-icon-login' alt='' onClick={this.logout}/></Link>
                                    </div>
                                }
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
                                    <div className='top-menu'>
                                    <Popup trigger={<h3 className='nb-book' >cookbook</h3>}modal><SignIn pageDirect={this.state.pageName}/></Popup>
                                    <Popup trigger={ <h3 className='nb-profile'>profile</h3>} modal><SignIn pageDirect={this.state.pageName}/></Popup>
                                    <Popup trigger={<h3 className='nb-login'> login</h3>} modal><SignIn /></Popup>
                                    </div>
                                    :<div className='top-menu'>
                                        <h3 className='nb-book' onClick={this.handleCookbook}>cookbook</h3>
                                        <Link to='/profile'><h3 className='nb-profile'>profile</h3></Link>
                                        <Link to='/input' onClick={this.logout}>logout</Link>
                                        </div>
                                    }
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
