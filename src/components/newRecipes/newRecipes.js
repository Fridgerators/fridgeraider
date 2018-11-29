import React, { Component } from 'react';
import axios from 'axios';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: []
        }
    }

    async componentDidMount() {
        let { searchIngredients } = this.props.match.params
        const { REACT_APP_AppID, REACT_APP_AppKey } = process.env;
        axios.get(`https://api.edamam.com/search?q=${searchIngredients}&app_id=${REACT_APP_AppID}&app_key=${REACT_APP_AppKey}`)
            .then(res =>
                this.setState({ recipes: res.data.hits }))
    }


    render() {
        console.log('recipes', this.state.recipes)
        let recipeRes = this.state.recipes.map((element, index) => {
            return (
                <div key={index}>
                    <img src={element.recipe.image} alt='' />
                    <h4>{element.recipe.label}</h4>
                </div>
            )
        })
        return (
            <div>
                NewRecipes
                {recipeRes}
            </div>
        )
    }
}

export default NewRecipes;

//add next button to increment recipe results by 10;