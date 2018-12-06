import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../navbar/navbar';
import expand from '../images/open-icon.svg';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading';
import next from '../images/next.svg';
import prev from '../images/previous.svg';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            rIndex: 0,
            loaded: false
        }
        this.handleNext = this.handleNext.bind(this)
    }

    componentDidMount() {
        let { searchIngredients } = this.props.match.params
        axios.get(`/api/recipes/getResults/${searchIngredients}/0`)
            .then(res =>
                this.setState({ 
                    recipes: res.data.hits,
                    loaded: true
                }))
    }


    async handleNext(){
        let { searchIngredients } = this.props.match.params
        let {rIndex} = this.state;
        console.log(rIndex)
        await this.setState({rIndex:rIndex+=10})
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
        console.log('recipes', this.state.recipes)
        console.log('index',this.state.rIndex)

        let recipeRes = this.state.recipes.map((element, index) => {
            return (
                <div key={index} className='nr-outer-box'>
                <div className='initial-view'>
                    <img className='food' src={element.recipe.image} alt={element.recipe.image} />
                    <div className='nr-tab'>
                    <h4>{element.recipe.label}</h4>
                        <label>ingredients and instructions</label>
                        <img src={expand} onClick={this.expandRecipe} alt="see recipe"/>
                    </div>
                </div>
        
                        <div className='nr-tab-content'>
                            <p>{element.recipe.ingredientLines}</p>
                            {/* <h5>for full instructions please visit {element.recipe.url}</h5> */}
                        </div>
                </div>
            )
        })
        return (
            <div className="nr-bg header-curve">
            { this.state.loaded ? 
            <div>
                <Nav/>

                {/* <img src={next} className='nr-next' onClick={this.handleNext}>next</img> */}
<Grid item>

            <Grid container spacing={8}justify="center" alignItems="baseline" direction="row" margin="80px">
                    {recipeRes}
           
            </Grid>
</Grid>
<div className='nr-buttons'>

                <img src={next} className='nr-next-btn' onClick={this.handleNext} />
</div>

            </div>
                
                : <Loading/> }

            </div>
        )
    }
}

export default NewRecipes;

//add next button to increment recipe results by 10;
//source for accordion instructions https://codepen.io/lara-potjewyd/pen/gBJEaG