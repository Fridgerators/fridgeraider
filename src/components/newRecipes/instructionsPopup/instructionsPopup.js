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
            splitInstructions:[]
        }
        this.handleSaveRecipe=this.handleSaveRecipe.bind(this);
    }

    async componentDidMount() {
        let res = await axios.get(`/api/recipes/getRecipe/${this.props.recipeId}`)
        await this.setState({instructionsInfo: res.data})
        await this.setState({ingredientInfo: res.data.extendedIngredients})
        if (res.data.analyzedInstructions[0]) {
            await this.setState({ splitInstructions: res.data.analyzedInstructions[0].steps })
        } else {
            await this.setState({ splitInstructions: [{ number: 1, step: "This recipe did not come with instructions. Whoops" }] })
        }
    }

    handleSaveRecipe(){
        let {recipeId,recipeTitle,recipeImage}=this.props
        axios.post('/api/cookbook/saveRecipe',{recipeId,image: recipeImage,title: recipeTitle}).then(()=>
        swal(`${recipeTitle} has been saved`)
        )
    }

    render() {

        const ipCustomStyles = {
            content : {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              height: '500px', // <-- This sets the height
              overflow: 'auto' // <-- This tells the modal to scrol
            }
          };

        const ingredientList = this.state.ingredientInfo.map((element,index)=>{
            return(
                <p key={index}>{element.original}</p>
            )
        })

        const instructionList = this.state.splitInstructions.map((element,id)=>{
            return(
                <div key={id}>
                    <p>{element.number}. {element.step}</p>
                    <br/>
                </div>
            )
        })
        
        return (
            <div style={ipCustomStyles.content}>
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
                                    <br/>
                                    <h1 className='recipe-header'>ingredients</h1>
                                    <br/>
                                    {ingredientList}
                                    <br/>
                                    <h1 className='recipe-header'>instructions</h1>
                                    <br/>

                                    {instructionList}
                                </div>
                                {this.props.user.empty==='empty'?null:
                                                <img className='delete-save-recipe' src={saveRecipe} onClick={this.handleSaveRecipe} alt="save button" />
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