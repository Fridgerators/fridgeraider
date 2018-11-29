import React, { Component } from 'react';
import axios from 'axios';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            searchIngredients: [],
            recipes: {}
        }
    }

    componentDidMount() {
        let {searchIngredients} = this.props.match.params
        axios.get(`/api/recipes/getresults`, searchIngredients)
    }


    render() {
        console.log('recipes', this.state.recipes)
        console.log("nr", this.props.match.params.ingredients);

        return (
            <div>
                NewRecipes
            </div>
        )
    }
}

export default NewRecipes;