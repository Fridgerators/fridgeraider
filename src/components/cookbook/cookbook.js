import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Media from 'react-media';
import Navbar from '../navbar/navbar';
import CookbookPopup from './cookbookPopup/cookbookPopup';
import swal from 'sweetalert2';
import expand from '../images/open-icon.svg';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading';
import next from '../images/next.svg';
import prev from '../images/previous.svg';
import fork from '../images/fork.svg';
import plate from '../images/plate.svg';
import knife from '../images/knife.svg';
// import saveRecipe from '../images/saveRecipe.svg';
import deleteIcon from '../../components/images/delete.svg';

class Cookbook extends Component {
    constructor() {
        super()
        this.state = {
            myRecipes: [],
            firstIndex: 0,
            allRecipeInfo: []
        }
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        this.handleForward = this.handleForward.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleRetrieveDetails = this.handleRetrieveDetails.bind(this);
    }
    async componentDidMount() {
        let recDets = [];
        for (let i = 0; i < 45; i++) {
            recDets[i] = {
                preparationMinutes: 0,
                cookingMinutes: 0,
                readyInMinutes: 0,
                instructions: '',
                servings: 0,
                ingredients: []
            }
        }
        await this.setState({ allRecipeInfo: recDets })
        await axios.get('/api/cookbook/recipeList').then(res => {
            this.setState({ myRecipes: res.data })
        })
    }
    async handleAccordian(index, id) {
        document.getElementById(`cc${index}`).classList.toggle('expand');
        document.getElementById(`bb${index}`).classList.toggle('radius');
        document.getElementById(`aa${index}`).classList.toggle('radius2');
        document.getElementById(`dd${index}`).classList.toggle('spin');
        if (!this.state.allRecipeInfo[index].ingredients[0]) {
            let recipeDeets = [...this.state.allRecipeInfo];
            await axios.get(`/api/recipes/getRecipe/${id}`)
                .then(response => {
                    recipeDeets[index].preparationMinutes = response.data.preparationMinutes;
                    recipeDeets[index].cookingMinutes = response.data.cookingMinutes;
                    recipeDeets[index].readyInMinutes = response.data.readyInMinutes;
                    recipeDeets[index].instructions = response.data.analyzedInstructions[0].steps;
                    recipeDeets[index].servings = response.data.servings;
                    recipeDeets[index].ingredients = response.data.extendedIngredients.map((element, index) => {
                        return element.original
                    })
                })
            await this.setState({
                allRecipeInfo: recipeDeets
            })
        }
    }
    async handleRetrieveDetails() {
        let res = await axios.get(`/api/recipes/getRecipe/${this.props.recipeId}`)
        if (this.state.open === true) {
            await this.setState({ prepTimeServing: res.data })
            await this.setState({ ings: res.data.extendedIngredients })
            await this.setState({ instructionSteps: res.data.analyzedInstructions[0].steps })
        }
    }

    async handleDeleteRecipe(id, title) {
        let res = await axios.delete(`/api/cookbook/deleteRecipe/${id}`)
        await this.setState({ myRecipes: res.data })
        await swal(`${title} has been removed`)

    }

    async handleForward() {
        await this.setState({
            firstIndex: this.state.firstIndex += 9
        })
    }
    async handleBack() {
        await this.setState({
            firstIndex: this.state.firstIndex -= 9
        })
    }
    render() {
        console.log('this.state.firstIndex: ',this.state.firstIndex)
        const formatInstructions = this.state.allRecipeInfo.map((element, id) => {
            return (
                <p key={id}>{element.number}{element.step}</p>
            )
        })
        let favRecipes = this.state.myRecipes.map((element, index) => {
            return (
                <div key={index} className='nr-outer-box'>
                    <div className='initial-view'>
                        <img id={`aa${index}`} className='food' src={element.image} alt='' />
                        <div id={`bb${index}`} className='nr-tab' >

                        <div className='label-box recipeTitle'>
                            <img src={deleteIcon} className='delete-lemon' onClick={() => this.handleDeleteRecipe(element.recipe_id, element.title)} alt="delete recipe"/>
                            <h4 >{element.title}</h4>
                        </div>
                            <Media query='(max-width: 768px)'>
                                {matches => matches ? (
                                    <div>
                                        <div className='label-box'>
                                            <label>ingredients and instructions</label>
                                            <img id={`dd${index}`} src={expand} onClick={() => this.handleAccordian(index, element.id)} alt="see recipe" />
                                        </div>
                                        <div id={`cc${index}`} className='nr-tab-content'>
                                            {
                                                this.state.allRecipeInfo[index].instructions === '' ?
                                                    <div className='loading-box'>
                                                        <img className='fork popup' src={fork} alt="" />
                                                        <img className='plate popup' src={plate} alt="" />
                                                        <img className='knife popup' src={knife} alt="" />
                                                        <h1>loading...</h1>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div>
                                                            {this.state.allRecipeInfo[index].preparationMinutes && this.state.allRecipeInfo[index].cookingMinutes ?
                                                                <div>
                                                                    <p>prep:{this.state.allRecipeInfo[index].preparationMinutes} minutes</p>
                                                                    <p>cook:{this.state.allRecipeInfo[index].cookingMinutes} minutes</p>
                                                                </div>
                                                                :
                                                                <p>Ready in:{this.state.allRecipeInfo[index].readyInMinutes} minutes</p>
                                                            }
                                                            <p>serves {this.state.allRecipeInfo[index].servings}</p>
                                                        </div>
                                                        <div>
                                                            <p>{this.state.allRecipeInfo[index].ingredients}</p>
                                                            {formatInstructions}
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                        <Popup trigger={
                                            <div className='label-box'>
                                                <label>ingredients and instructions</label>
                                                <img className='desktop-view-recipe' id={`d${index}`} src={expand} alt="view instructions"/>
                                            </div>
                                        } modal><CookbookPopup recipeNum={element.recipe_id} recipeLabel={element.title} /></Popup>)
                                }
                            </Media>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='cookbook-bg header-curve'>
                <div className="nr-bg header-curve">
                    {this.state.myRecipes.length ?
                        <div>
                            <Navbar />
                            <Grid item>
                                <Grid container spacing={8} justify="center" alignItems="baseline" direction="row" margin="80px">
                                    {favRecipes[0 + this.state.firstIndex]}
                                    {favRecipes[1 + this.state.firstIndex]}
                                    {favRecipes[2 + this.state.firstIndex]}
                                    {favRecipes[3 + this.state.firstIndex]}
                                    {favRecipes[4 + this.state.firstIndex]}
                                    {favRecipes[5 + this.state.firstIndex]}
                                    {favRecipes[6 + this.state.firstIndex]}
                                    {favRecipes[7 + this.state.firstIndex]}
                                    {favRecipes[8 + this.state.firstIndex]}
                                </Grid>
                            </Grid>
                            {this.state.firstIndex === 0 ?
                                <img src={next} className='nr-next-btn' onClick={this.handleForward} alt="see next page"/>
                                :
                                <div>
                                    {this.state.firstIndex >= 36 ?
                                        null
                                        : <img src={next} className='nr-next-btn' onClick={this.handleForward} alt="see next page"/>
                                    }
                                    <img src={prev} className='nr-previous' onClick={this.handleBack} alt="see previous page"/>
                                </div>
                            }
                        </div>
                        : <Loading />}
                </div>
            </div>
        )
    }
}
export default Cookbook;
