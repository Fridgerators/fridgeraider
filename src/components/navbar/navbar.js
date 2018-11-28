import React, { Component } from 'react';
import Media from 'react-media';

class Navbar extends Component {
    render() {
        return (
            <div className='nb-page'>
                <Media query='(max-width: 400px)'>
                    {matches =>
                        matches ? (
                            <div className='nb-mobile'>
                                <img src='' className="nb-icon-book" />
                                <img src='' className='nb-icon-profile' />
                                <img src='' className='nb-icon-login' />
                            </div>
                        ) : (
                            <div className='nb-large-screen'>
                                <h3 className='nb-title'>what's in your fridge?</h3>
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