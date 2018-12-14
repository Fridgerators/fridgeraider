import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Media from 'react-media';
import Navbar from '../navbar/navbar';
import InstructionsPopup from './instructionsPopup/instructionsPopup';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import expand from '../images/open-icon.svg';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading';
import next from '../images/next.svg';
import prev from '../images/previous.svg';
import fork from '../images/fork.svg';
import plate from '../images/plate.svg';
import knife from '../images/knife.svg';
import saveRecipe from '../images/saveRecipe.svg';

class NewRecipes extends Component {
    constructor() {
        super()
        this.state = {
            recipes: [],
            recipeDisplay: [],
            recipeRes: [],
            params: '',
            tIndex: 0,
            iniState: 0,
            recipeDetails: [],
            ingredientInfo: []
        }
        this.expandRecipe = this.expandRecipe.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
    }

    async componentDidMount() {
        let recDets = [];
        for (let i = 0; i < 18; i++) {
            recDets[i] = {
                preparationMinutes: 0,
                cookingMinutes: 0,
                readyInMinutes: 0,
                instructions: [],
                servings: 0,
                ingredients: []
            }
        }
        await this.setState({ recipeDetails: recDets })
        let { searchIngredients } = this.props.match.params;
        let res = await axios.get(`/api/recipes/getResults/${searchIngredients}/1`)
        await this.setState({ recipes: res.data })
        await this.setState({ params: searchIngredients })
    }
    async handleNext() {
        await this.setState({
            iniState: this.state.iniState += 9
        })
    }
    async handlePrevious() {
        await this.setState({
            iniState: this.state.iniState -= 9
        })
    }

    async expandRecipe(index, id) {
        document.getElementById(`c${index}`).classList.toggle('expand');
        document.getElementById(`b${index}`).classList.toggle('radius');
        document.getElementById(`a${index}`).classList.toggle('radius2');
        document.getElementById(`d${index}`).classList.toggle('spin');

        if (!this.state.recipeDetails[index].ingredients[0]) {
            let recipeDeets = [...this.state.recipeDetails];
            await axios.get(`/api/recipes/getRecipe/${id}`)
                .then(response => {
                    recipeDeets[index].preparationMinutes = response.data.preparationMinutes;
                    recipeDeets[index].cookingMinutes = response.data.cookingMinutes;
                    recipeDeets[index].readyInMinutes = response.data.readyInMinutes;
                    if (response.data.analyzedInstructions[0]) {
                        recipeDeets[index].instructions = response.data.analyzedInstructions[0].steps;
                    } else {
                        recipeDeets[index].instructions = [{ number: 1, step: "This recipe did not come with instructions. Whoops" }]
                    }
                    if (response.data.servings) {
                        recipeDeets[index].servings = response.data.servings;
                    }
                    recipeDeets[index].ingredients = response.data.extendedIngredients.map((element, index) => {
                        return element.original
                    })
                })
            await this.setState({
                recipeDetails: recipeDeets,

            })
        }
    }

    handleSaveRecipe(id, image, title) {
        axios.post('/api/cookbook/saveRecipe', { recipeId: id, image, title }).then(() =>
            swal(`${title} has been saved`)
        )
    }
    render() {
        const numberedInstructions = this.state.recipeDetails.map((element, id) => {
            const ingredientList = element.ingredients.map((element, index) => {
                return (
                    <p key={index}>{element}</p>
                )
            })

            let steps = element.instructions.map((element, index) => {
                return (
                    <p key={index}>{element.number}. {element.step}</p>
                )
            })
            return (
                <div key={id}>
                    <h1 className='recipe-header'>ingredients</h1>
                    {ingredientList}
                    <hr />
                    <h1 className='recipe-header'>instructions</h1>
                    {steps}
                </div>

            )
        })
        let recipeRes = this.state.recipes.map((element, index) => {
            return (
                <div key={index} className='nr-outer-box'>
                    <div className='initial-view'>
                        <img id={`a${index}`} className='food' src={element.image} alt={element.image} />
                        <div id={`b${index}`} className='nr-tab'>
                            <h4>{element.title}</h4>
                            <Media query='(max-width: 768px)'>
                                {matches => matches ? (
                                    <div>
                                        <div className='label-box'>
                                            <label>ingredients and instructions</label>
                                            <img id={`d${index}`} src={expand} onClick={() => this.expandRecipe(index, element.id)} alt="see recipe" />
                                        </div>
                                        <div id={`c${index}`} className='nr-tab-content'>
                                            {
                                                this.state.recipeDetails[index].instructions.length === 0 ?
                                                    <div>
                                                        <img className='fork' src={fork} alt="" />
                                                        <img className='plate' src={plate} alt="" />
                                                        <img className='knife' src={knife} alt="" />
                                                        <h1>loading...</h1>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div>
                                                            {this.state.recipeDetails[index].preparationMinutes && this.state.recipeDetails[index].cookingMinutes ?
                                                                <div>
                                                                    <p>prep: {this.state.recipeDetails[index].preparationMinutes} minutes</p>
                                                                    <p>cook: {this.state.recipeDetails[index].cookingMinutes} minutes</p>
                                                                </div>
                                                                :
                                                                <p>Ready in: {this.state.recipeDetails[index].readyInMinutes} minutes</p>
                                                            }
                                                            <p>serves {this.state.recipeDetails[index].servings}</p>
                                                        </div>
                                                        <div>
                                                            {numberedInstructions[index]}
                                                        </div>
                                                        {this.props.user.empty === 'empty' ? null :
                                                            <img className='delete-save-recipe' src={saveRecipe} onClick={() => this.handleSaveRecipe(element.id, element.image, element.title)} alt="click to save recipe" />
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                        <Popup trigger={
                                            <div className='label-box'>
                                                <label>ingredients and instructions</label>
                                                <img id={`d${index}`} src={expand} alt='' />
                                            </div>} modal><InstructionsPopup recipeId={element.id} recipeTitle={element.title} recipeImage={element.image} /></Popup>)
                                }
                            </Media>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="nr-bg header-curve">
                {this.state.recipes.length ?
                    <div>
                        <Navbar />
                        <Grid item>
                            <Grid container spacing={8} justify="center" alignItems="baseline" direction="row" margin="80px">
                                {recipeRes[0 + this.state.iniState]}
                                {recipeRes[1 + this.state.iniState]}
                                {recipeRes[2 + this.state.iniState]}
                                {recipeRes[3 + this.state.iniState]}
                                {recipeRes[4 + this.state.iniState]}
                                {recipeRes[5 + this.state.iniState]}
                                {recipeRes[6 + this.state.iniState]}
                                {recipeRes[7 + this.state.iniState]}
                                {recipeRes[8 + this.state.iniState]}
                            </Grid>
                        </Grid>
                        {this.state.iniState === 0 ?
                            <img src={next} className='nr-next-btn' onClick={this.handleNext} alt="click to see next page" />
                            :
                            <div>
                                {this.state.iniState >= 36 ?
                                    null
                                    : <img src={next} className='nr-next-btn' onClick={this.handleNext} alt="click to see next page" />
                                }
                                <img src={prev} className='nr-previous' onClick={this.handlePrevious} alt="click to see previous page" />
                            </div>
                        }
                    </div>
                    : <Loading />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state;
    return { user }
}

export default connect(mapStateToProps)(NewRecipes);