import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Media from 'react-media';
import Navbar from '../navbar/navbar';
import InstructionsPopup from './instructionsPopup/instructionsPopup';
import {connect} from 'react-redux';
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
            recipeDetails: []
        }


        this.expandRecipe = this.expandRecipe.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleSaveRecipe=this.handleSaveRecipe.bind(this);
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
        await this.setState({ recipeDetails: recDets })
        console.log(this.state.recipeDetails)
        let { searchIngredients } = this.props.match.params
        let { rIndex } = this.state;
        let res = await axios.get(`/api/recipes/getResults/${searchIngredients}/1`)
        await this.setState({recipes: res.data})

        await this.setState({ params: searchIngredients })
        await this.setState({ recipeRes: this.tempName() })
        // let id=[]
        // res.data.map(element=>{
        //     id.push(element.id)})
        //     console.log('ids',id)
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

    async expandRecipe(index, id) {
        // this.setState({ tIndex: index })
        document.getElementById(`c${index}`).classList.toggle('expand');
        document.getElementById(`b${index}`).classList.toggle('radius');
        document.getElementById(`a${index}`).classList.toggle('radius2');
        document.getElementById(`d${index}`).classList.toggle('spin');

        if (!this.state.recipeDetails[index].ingredients[0]) {
            let recipeDeets = [...this.state.recipeDetails]
            let ingDeets = [];
        let res= await axios.get(`/api/recipes/getRecipe/${id}`)
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
                recipeDetails: recipeDeets,

            })
            console.log(`got recipe deets off axios for recipe id: ${id}`, this.state.recipeDetails[index])
            console.log('nr recipeDetails',this.state.recipeDetails)
        }

        // document.getElementById(`c${index}`).classList.toggle('expand');
        // document.getElementById(`b${index}`).classList.toggle('radius');
        // document.getElementById(`a${index}`).classList.toggle('radius2');
        // document.getElementById(`d${index}`).classList.toggle('spin');
    }

    handleSaveRecipe(id,image,title){
        axios.post('/api/cookbook/saveRecipe',{recipeId:id,image,title }).then(()=>
        swal(`${title} has been saved`)
        )
    }

    // async handlePopUpInfo(index, id){
    //     if (!this.state.recipeDetails[index].ingredients[0]) {
    //         let recipeDeets = [...this.state.recipeDetails]
    //         let ingDeets = [];
    //         await axios.get(`/api/recipes/getRecipe/${id}`)
    //             .then(response => {
    //                 recipeDeets[index].preparationMinutes = response.data.preparationMinutes;
    //                 recipeDeets[index].cookingMinutes = response.data.cookingMinutes;
    //                 recipeDeets[index].readyInMinutes = response.data.readyInMinutes;
    //                 recipeDeets[index].instructions = response.data.instructions;
    //                 recipeDeets[index].servings = response.data.servings;
    //                 recipeDeets[index].ingredients = response.data.extendedIngredients.map((element, index) => {
    //                     return element.original
    //                 })
    //             })
    //         await this.setState({
    //             recipeDetails: recipeDeets,

    //         })
    //     }
    // }

    tempName() {
        return

    }
    
    render() {
        console.log('nr recipeDetails',this.state.recipeDetails)
        const numberedInstructions = this.state.recipeDetails.map((element,id)=>{
            return(
            <p key={id}>{element.number}{element.step}</p>
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
                                        this.state.recipeDetails[index].instructions === '' ?
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
                                                            <p>prep:{this.state.recipeDetails[index].preparationMinutes} minutes</p>
                                                            <p>cook:{this.state.recipeDetails[index].cookingMinutes} minutes</p>
                                                        </div>
                                                        :
                                                        <p>Ready in:{this.state.recipeDetails[index].readyInMinutes} minutes</p>

                                                    }
                                                    <p>serves {this.state.recipeDetails[index].servings}</p>
                                                </div>
                                                <div>
                                                    <p>{this.state.recipeDetails[index].ingredients}</p>
                                                    {numberedInstructions}
                                                </div>
                                                {this.props.user.empty==='empty'?null:
                                                <button onClick={()=>this.handleSaveRecipe(element.id,element.image,element.title,)}>save</button>
                                                }
                                            </div>

                                    }
                                </div>
                                </div>
                                    ):(
                                        <Popup trigger={
                                        <div className='label-box'>
                                            <label>ingredients and instructions</label>
                                            <img className='desktop-view-recipe' id={`d${index}`} src={expand} />
                                        </div>
                                        
                                        // onClick={() => this.expandRecipe(index, element.id)}
                                        
                                    }modal><InstructionsPopup recipeId={element.id} recipeTitle={element.title} recipeImage={element.image}/></Popup>)
                                }
                                </Media>
                                
                                {/* <div id={`c${index}`} className='nr-tab-content'>
                                    {
                                        this.state.recipeDetails[index].instructions === '' ?
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
                                                            <p>prep:{this.state.recipeDetails[index].preparationMinutes} minutes</p>
                                                            <p>cook:{this.state.recipeDetails[index].cookingMinutes} minutes</p>
                                                        </div>
                                                        :
                                                        <p>Ready in:{this.state.recipeDetails[index].readyInMinutes} minutes</p>

                                                    }
                                                    <p>serves {this.state.recipeDetails[index].servings}</p>
                                                </div>
                                                <div>
                                                    <p>{this.state.recipeDetails[index].ingredients}</p>
                                                    <p>{this.state.recipeDetails[index].instructions}</p>
                                                </div>
                                                {this.props.user.empty==='empty'?null:
                                                <img src={saveRecipe} style={{cursor: "pointer"}}/>
                                                }
                                            </div>

                                    }
                                </div> */}
                            
                        </div>
                    </div>
                    {/* <div id={`c${index}`} className='nr-tab-content'>
                        {
                            this.state.recipeDetails[index].instructions === '' ?
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
                                                <p>prep:{this.state.recipeDetails[index].preparationMinutes} minutes</p>
                                                <p>cook:{this.state.recipeDetails[index].cookingMinutes} minutes</p>
                                            </div>
                                            :
                                            <p>Ready in:{this.state.recipeDetails[index].readyInMinutes} minutes</p>

                                        }
                                        <p>serves {this.state.recipeDetails[index].servings}</p>
                                    </div>
                                    <div>
                                        <p>{this.state.recipeDetails[index].ingredients}</p>
                                        <p>{this.state.recipeDetails[index].instructions}</p>
                                    </div>
                                </div>

                        }
                    </div> */}
                </div>
            )
        })

        
        return (
            <div className="nr-bg header-curve">
                {this.state.loaded ?
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
                    : <Loading />} 
            </div>
        )
    }
}

function mapStateToProps(state){
   let {user}= state;
   return {user}
}

export default connect(mapStateToProps)(NewRecipes);