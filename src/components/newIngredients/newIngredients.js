import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';

class NewIngredients extends Component {
    constructor() {
        super()

        this.state = {
            ingredients: ['', '', '', '', '', '']
        }
        this.handleClear=this.handleClear.bind(this);
        this.handleAlert=this.handleAlert.bind(this);
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

    handleClear(){
        this.setState({ingredients: ['', '', '', '', '', '']})
    }

    handleAlert(){
        alert("please enter an ingredient")
    }


    render() {

        console.log('state:', this.state.ingredients);

        const newInput = this.state.ingredients.map((ingredient, index) => {
            return (
                <div key={index}>
                    <input className='ni-input' value={ingredient} onChange={(e) => this.handleChange(e, index)} />
                </div>
            )
        })
        const finalIndex = newInput.length - 1;
        let searchIngredients= ''
        
        let {ingredients} = this.state;
        for(let i = 0; i<ingredients.length; i++){
            if(ingredients[i]){
                searchIngredients += ingredients[i] + ','
            }
        }

        return (
            <div>
                <Navbar/>
                <h3 className="ni-title">enter the ingredients you have in your fridge and cupboards so we can find the perfect recipe for you!</h3>
                {newInput}
                {searchIngredients?
                <Link to={`/results/${searchIngredients}`}><button className='ni-button'>Search</button></Link>:
                <button className='ni-button' onClick={this.handleAlert}>Search</button>
                }
                <button onClick={this.handleClear}>Clear</button>
                <button className='ni-add-input-' onClick={(e) => this.addIngredient(e)}>+</button>
                <button className='ni-remove-input' onClick={() => this.handleRemove(finalIndex)}>-</button>
            </div>
        )
    }
}

export default NewIngredients;



//source for dynamic input fields info : https://www.youtube.com/watch?v=9IhsYu4eKJ8