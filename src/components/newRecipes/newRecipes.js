import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
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
            recipeDisplay: [],
            recipeRes: [],
            params: '',
            rIndex: 0,
            tIndex: 0,
            iniState: 0,
            loaded: false
        }


        this.expandRecipe = this.expandRecipe.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    async componentDidMount() {
        let { searchIngredients } = this.props.match.params
        let { rIndex } = this.state;
        let res = await axios.get(`/api/recipes/getResults/${searchIngredients}/1`)
        await this.setState({ 
            recipes: res.data,
            loaded: true })
        await this.setState({params: searchIngredients})
        await this.setState({recipeRes: this.tempName()})
        console.log(this.state.recipeRes)
        // await this.pageDisplay()
    }

    async handleNext() {
        await this.setState({
            iniState: this.state.iniState += 9
        })
        // if (this.state.iniState)
            // await this.pageDisplay()
    }
    async handlePrevious() {
        await this.setState({
            iniState: this.state.iniState -= 9
        })
        // await this.pageDisplay()
    }

    expandRecipe(TF, index, id) {
        // this.setState({ tIndex: index })
        if(TF[0] === 1){
        TF[0] = 0
        // let res = await axios.get(`/api/recipes/getRecipe/${id}`)
        }
        console.log(id)

        document.getElementById(`c${index}`).classList.toggle('expand');
        document.getElementById(`b${index}`).classList.toggle('radius');
        document.getElementById(`a${index}`).classList.toggle('radius2');
        document.getElementById(`d${index}`).classList.toggle('spin');
    }
    // pageDisplay() {
    //     console.log(this.state.recipes)
    //     let iniDiv = this.state.iniState / 9;
    //     let tempRecipeDisplay = [];

    //     for (let i = 0; i < 36; i++) {
    //         tempRecipeDisplay[i - (iniDiv * 9)] = this.state.recipes[i]
    //     }
    //     this.setState({
    //         recipeDisplay: tempRecipeDisplay
    //     })
    //     console.log(tempRecipeDisplay);

    // }
    tempName(){
        return this.state.recipes.map((element, index) => {
        let TF = [1];
        let instructions = [];
        // console.log('Index: ', index, 'TF: ', TF)
        return (
            <div key={index} className='nr-outer-box'>
                <div className='initial-view'>
                    <img id={`a${index}`} className='food' src={element.image} alt={element.image} />
                    <div id={`b${index}`} className='nr-tab'>
                        <h4>{element.title}</h4>
                        <label>ingredients and instructions</label>
                        <img id={`d${index}`} src={expand} onClick={() => this.expandRecipe(TF, index, element.id)} alt="see recipe" />
                    </div>
                </div>
                    <div id={`c${index}`} className='nr-tab-content'>
                        <p>{element.ingredientLines}</p>
                    </div>
            </div>
        )
    })

    }
    render() {
        // let recipeRes = 
        return (
            <div className="nr-bg header-curve">
            { this.state.loaded ? 
            <div>
                <Navbar />
      
                <Grid item>
                <Grid container spacing={8}justify="center" alignItems="baseline" direction="row" margin="80px">

                {this.state.recipeRes[0 + this.state.iniState]}
                {this.state.recipeRes[1 + this.state.iniState]}
                {this.state.recipeRes[2 + this.state.iniState]}
                {this.state.recipeRes[3 + this.state.iniState]}
                {this.state.recipeRes[4 + this.state.iniState]}
                {this.state.recipeRes[5 + this.state.iniState]}
                {this.state.recipeRes[6 + this.state.iniState]}
                {this.state.recipeRes[7 + this.state.iniState]}
                {this.state.recipeRes[8 + this.state.iniState]}
                </Grid>
        </Grid>

                {this.state.iniState === 0 ?
                    <img src={next} className='nr-next-btn' onClick={this.handleNext} />
                    :
                    <div>
                        {this.state.iniState >= 36 ?
                            null
                            : <img src={next} className='nr-next-btn' onClick={this.handleNext} />
                        }
                        <img src={prev} className='nr-previous' onClick={this.handlePrevious} />
                    </div>
                }
            </div>
            
             : <Loading/> }
        </div>
        )
    }
}

export default NewRecipes;

//add next button to increment recipe results by 10;
//source for accordion instructions https://codepen.io/lara-potjewyd/pen/gBJEaG
