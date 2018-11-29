import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import header from '../../components/images/header-curve.svg';
import Nav from '../navbar/navbar';


class NewIngredients extends Component {
    constructor() {
        super()

        this.state = {
            ingredients: ['', '', '', '', '', '']
        }
    }
    addIngredient() {
        this.setState({ ingredients: [...this.state.ingredients, ''] })
    }

    handleChange(e, index) {
        this.state.ingredients[index] = e.target.value
        this.setState({ ingredients: this.state.ingredients })
    }

    handleRemove(index) {
        this.state.ingredients.splice(index, 1)
        this.setState({ ingredients: this.state.ingredients })
    }



    render() {

        console.log('state:', this.state.ingredients);

        const newInput = this.state.ingredients.map((ingredient, index) => {
            return (
                <div key={index} >
                    <input className='ni-input' value={ingredient} onChange={(e) => this.handleChange(e, index)} />
                </div>
            )
        })
        const finalIndex = newInput.length - 1;
        const ingredientParam = [];
        const removeNull = this.state.ingredients.map((element) => {
            if (element !== '') {
                ingredientParam.push(element)
            }
        })
        console.log('ingredientParam',ingredientParam)
        return (
            <div className="ni-bg">
                <Nav />
                <img className="header-curve" src={header} alt="background"/>

                <h3 className="ni-title">enter the ingredients you have in your fridge and cupboards so we can find the perfect recipe for you!</h3>
                    {newInput}
                <Link to={`/results/${ingredientParam}`}><button className='ni-button'>Search</button></Link>

                <button className='ni-add-input-' onClick={(e) => this.addIngredient(e)}>+</button>
                <button className='ni-remove-input' onClick={() => this.handleRemove(finalIndex)}>-</button>
            </div>
        )
    }
}

export default NewIngredients;



//source for dynamic input fields info : https://www.youtube.com/watch?v=9IhsYu4eKJ8