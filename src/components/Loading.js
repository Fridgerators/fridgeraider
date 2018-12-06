import React from 'react';
import fork from './images/fork.svg';
import plate from './images/plate.svg';
import knife from './images/knife.svg';

export default function Loading(props) {
    return (

    <div className='loading header-curve'>
      <div className='loading-animation'>
        <img className='fork' src={fork} alt=""/>
        <img className='plate' src={plate} alt=""/>
        <img className='knife' src={knife} alt=""/>
      </div>
      <h1>loading...</h1>

    </div>
       

    )

}