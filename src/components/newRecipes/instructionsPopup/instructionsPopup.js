import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import swal from 'sweetalert2';
import fork from '../../images/fork.svg';
import plate from '../../images/plate.svg';
import knife from '../../images/knife.svg';
import saveRecipe from '../../images/saveRecipe.svg';

class InstructionsPopup extends Component {
    constructor() {
        super()
        this.state = {
            instructionsInfo: {},
            ingredientInfo: [],
            analyzedInstructions:[]
        }
        this.handleSaveRecipe=this.handleSaveRecipe.bind(this);
    }

    async componentDidMount() {
        let res = await axios.get(`/api/recipes/getRecipe/${this.props.recipeId}`)
        await this.setState({instructionsInfo: res.data})
        await this.setState({ingredientInfo: res.data.extendedIngredients})
        await this.setState({analyzedInstructions: res.data.analyzedInstructions[0].steps})
    }

    handleSaveRecipe(){
        let {recipeId,recipeTitle,recipeImage}=this.props
        axios.post('/api/cookbook/saveRecipe',{recipeId,image: recipeImage,title: recipeTitle}).then(()=>
        swal(`${recipeTitle} has been saved`)
        )
    }

    render() {
        const ingredientList = this.state.ingredientInfo.map((element,index)=>{
            console.log('load',this.state.analyzedInstructions)
            return(
                <p key={index}>{element.original}</p>
            )
        })

        const instructionList = this.state.analyzedInstructions.map((element,id)=>{
            return(
            <p key={id}>{element.number}{element.step}</p>
            )
        })
        
        return (
            <div>
                <div className='pop-content'>
                    {
                        !this.state.instructionsInfo.hasOwnProperty('extendedIngredients') ?
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
                                    {this.state.instructionsInfo.preparationMinutes && this.state.instructionsInfo.cookingMinutes ?
                                        <div>
                                            <p>prep: {this.state.instructionsInfo.preparationMinutes} minutes</p>
                                            <p>cook: {this.state.instructionsInfo.cookingMinutes} minutes</p>
                                        </div>
                                        :
                                        <p>ready in {this.state.instructionsInfo.readyInMinutes} minutes</p>

                                    }
                                    <p>serves {this.state.instructionsInfo.servings}</p>
                                </div>
                                <div>
                                    {ingredientList}
                                    <br/>
                                    {instructionList}
                                </div>
                                {this.props.user.empty==='empty'?null:
                                                <img src={saveRecipe} onClick={this.handleSaveRecipe} alt="save button" />
                                                }
                            </div>

                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    let{user}= state;
    return {user}
 }
 
 export default connect(mapStateToProps)(InstructionsPopup);