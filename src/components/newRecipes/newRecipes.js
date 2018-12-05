import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../navbar/navbar';
import expand from '../images/open-icon.svg';

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
    
    expandRecipe = () => {
        document.querySelector('.nr-tab-content').classList.toggle('expand');
        document.querySelector('.nr-tab').classList.toggle('radius');
        document.querySelector('.food').classList.toggle('radius2');
        document.querySelector('.nr-tab>img').classList.toggle('spin');
    }

    render() {

        let recipeRes = this.state.recipes.map((element, index) => {
            console.log(element, index)
            return (
                <div key={index} className='nr-outer-box'>
                <div className="initial-view">
                    <img className='food' src={element.recipe.image} alt={element.recipe.image} />
                    <div className='nr-tab'>
                    <h4>{element.recipe.label}</h4>
                        <label>see ingredients and instructions</label>
                        <img src={expand} onClick={this.expandRecipe} alt="see recipe"/>
                    </div>

                </div>
                        {/* <input type="checkbox" name='tabs' /> */}
                        <div className='nr-tab-content'>
                            <p>{element.recipe.ingredientLines}</p>
                            {/* <h5>for full instructions please visit {element.recipe.url}</h5> */}
                        </div>
                </div>
            )
        })
        return (
            <div className="nr-bg header-curve">
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