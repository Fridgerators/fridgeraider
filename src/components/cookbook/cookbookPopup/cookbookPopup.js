import React, { Component } from 'react';
import axios from 'axios';
import fork from '../../images/fork.svg';
import plate from '../../images/plate.svg';
import knife from '../../images/knife.svg';
import deleteRecipe from '../../images/deleteRecipe.svg';

class CookbookPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeAndServings: {},
            ingredientResponse: [],
            splitInstructions:[]
        }
    }

    async componentDidMount() {
        let res = await axios.get(`/api/recipes/getRecipe/${this.props.recipeNum}`)
        await this.setState({timeAndServings: res.data})
        await this.setState({ingredientResponse: res.data.extendedIngredients})
        await this.setState({splitInstructions: res.data.analyzedInstructions[0].steps})
    }

    
    

    render() {
        console.log('props',this.props.recipeNum)
        const ingredientArray = this.state.ingredientResponse.map((element,index)=>{
            console.log('load',this.state.splitInstructions)
            return(
                <p key={index}>{element.original}</p>
            )
        })

        const instructionArray = this.state.splitInstructions.map((element,id)=>{
            return(
            <p key={id}>{element.number}.  {element.step}</p>
            )
        })
        
        return (
            <div>
                <div className='pop-content'>
                    {
                        !this.state.timeAndServings.hasOwnProperty('extendedIngredients') ?
                        <div className='loading2'>
                            <div className='loading-animation2'>
                                <img className='fork popup' src={fork} alt="fork" />
                                <img className='plate popup' src={plate} alt="plate" />
                                <img className='knife popup' src={knife} alt="knife" />
                                <h1>loading...</h1>
                            </div>
                            </div>


                            :
                            <div>
                                <div>
                                    {this.state.timeAndServings.preparationMinutes && this.state.timeAndServings.cookingMinutes ?
                                        <div>
                                            <p>prep: {this.state.timeAndServings.preparationMinutes} minutes</p>
                                            <p>cook: {this.state.timeAndServings.cookingMinutes} minutes</p>
                                        </div>
                                        :
                                        <p>ready in {this.state.timeAndServings.readyInMinutes} minutes</p>

                                    }
                                    <p>serves {this.state.timeAndServings.servings}</p>
                                </div>
                                <div>
                                    {ingredientArray}
                                    <br/>
                                    {instructionArray}
                                </div>
                                <img className='delete-save-recipe' src={deleteRecipe} onClick={this.handleDeleteRecipe} alt="delete this recipe" />
                            </div>

                    }
                </div>
            </div>
        )
    }
}
 
 export default CookbookPopup;