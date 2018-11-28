import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NewIngredients extends Component{
    render(){
        return(
            <div>
                <h3 className="ni-title">enter the ingredients you have in your fridge and cupboards so we can find the perfect recipe for you!</h3>
                <input className='ni-input'/>
                <Link to='/results'><button className='ni-button'></button></Link>
                <button className='ni-add-input-'></button>
                <button className='ni-remove-input'></button>
            </div>
        )
    }
}

export default NewIngredients;