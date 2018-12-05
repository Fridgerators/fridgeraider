import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../navbar/navbar';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            params: '',
            rIndex: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevios=this.handlePrevios.bind(this)
    }

    async componentDidMount() {
        let { searchIngredients } = this.props.match.params
        let res = await axios.get(`/api/recipes/getResults/${searchIngredients}/0`)
        await this.setState({ recipes: res.data.hits })
        await this.setState({params: searchIngredients})
    }

    async handleNext(){
        let { searchIngredients } = this.props.match.params
        let {rIndex} = this.state;
        await this.setState({rIndex:rIndex+=10})
        await axios.get(`/api/recipes/getResults/${searchIngredients}/${rIndex}`)
            .then(res =>
                this.setState({ recipes: res.data.hits }))
    }
    async handlePrevios(){
        let { searchIngredients } = this.props.match.params
        let {rIndex} = this.state;
        console.log(rIndex)
        await this.setState({rIndex:rIndex-=10})
        await axios.get(`/api/recipes/getResults/${searchIngredients}/${rIndex}`)
            .then(res =>
                this.setState({ recipes: res.data.hits }))
    }
    
    render() {

        let recipeRes = this.state.recipes.map((element, index) => {
            return (
                <div key={index}>
                    <img src={element.recipe.image} alt='' />
                    <h4>{element.recipe.label}</h4>
                    <div className='nr-tab'>
                        <input type="checkbox" name='tabs' />
                        <label>see ingredients and instructions</label>
                        <div className='nr-tab-content'>
                            <p>{element.recipe.ingredientLines}</p>
                            <h5>for full instructions please visit {element.recipe.url}</h5>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Nav/>
                NewRecipes
                {this.state.rIndex===0?
                <button className='nr-next' onClick={this.handleNext}>Next</button>
                :
                <div>
                  <button className='nr-next' onClick={this.handleNext}>Next</button>
                  <button className='nr-previous' onClick={this.handlePrevios}>previous</button>  
                </div>
                }
                {recipeRes}
                {this.state.rIndex===0?
                <button className='nr-next' onClick={this.handleNext}>Next</button>
                :
                <div>
                  <button className='nr-next' onClick={this.handleNext}>Next</button>
                  <button className='nr-previous' onClick={this.handlePrevios}>previous</button>  
                </div>
                }
            </div>
        )
    }
}

export default NewRecipes;

//source for accordian instructions https://codepen.io/lara-potjewyd/pen/gBJEaG