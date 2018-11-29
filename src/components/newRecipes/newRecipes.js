import React, { Component } from 'react';
import axios from 'axios';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            rIndex: 0
        }
        this.handleNext = this.handleNext.bind(this)
    }

    componentDidMount() {
        let { searchIngredients } = this.props.match.params
        axios.get(`/api/recipes/getResults/${searchIngredients}/0`)
            .then(res =>
                this.setState({ recipes: res.data.hits }))
    }

    async handleNext(){
        let { searchIngredients } = this.props.match.params
        let {rIndex} = this.state;
        console.log(rIndex)
        const increment = await this.setState({rIndex:rIndex+=10})
        const nextRecipeSet = await axios.get(`/api/recipes/getResults/${searchIngredients}/${rIndex}`)
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
                <button className='nr-next' onClick={this.handleNext}>Next</button>
                {recipeRes}
            </div>
        )
    }
}

export default NewRecipes;

//add next button to increment recipe results by 10;