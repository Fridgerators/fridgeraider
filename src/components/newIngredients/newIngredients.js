import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Nav from '../navbar/navbar';
import add from '../images/add.svg';
import search from '../images/search.svg';
import clearInputs from '../images/clear-inputs.svg';
import deleteIcon from '../images/delete.svg';

class NewIngredients extends Component {
    constructor() {
        super()

        this.state = {
            ingredients: ['', '', '', '', '', ''],
        }
    }
    addIngredient() {
        this.setState({ ingredients: [...this.state.ingredients, ''] })
    }

    handleChange(e, index) {
        this.state.ingredients[index] = e.target.value
        this.setState({ ingredients: this.state.ingredients })
    }

    handleRemove(index) {
        this.state.ingredients.splice(index, 1)
        this.setState({ ingredients: this.state.ingredients })
    }

    handleClear(){
        swal({
            title: 'Are you sure?',
            text: 'Do you really want to clear out this search?',
            showCancelButton: true,
            cancelButtonText: 'no!',
            confirmButtonText: 'yep',
            // backdrop: '$faded-bg'

        }).then((result) => {
            this.setState({ingredients: ['', '', '', '', '', '']})
        })
    }

    handleAlert(){
        swal("please enter an ingredient")
    }
 

    render() {

        console.log('state:', this.state.ingredients);

        const newInput = this.state.ingredients.map((ingredient, index) => {
            return (
                <div key={index} style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                    <input className='ni-input' value={ingredient} onChange={(e) => this.handleChange(e, index)} />
                    <img src={deleteIcon} className='prof-remove-ingredient' onClick={()=>this.handleRemove(index)} alt='lemon'/>
                </div>
            )
        })
        const finalIndex = newInput.length - 1;
        let searchIngredients= ''
        
        let {ingredients} = this.state;
        for(let i = 0; i<ingredients.length; i++){
            if(ingredients[i]){
                searchIngredients += ingredients[i] + ','
            }
        }
        console.log(searchIngredients, typeof searchIngredients)
        console.log('searchIngredients',searchIngredients)

        return (
            <div className="ni-bg header-curve">

                <Nav />
                <h3 className="title">enter the ingredients you have in your fridge and cupboards so we can find the perfect recipe for you!</h3>

                <div className="ni-inputs-box" >
                    <div className="inputs">
                    {newInput}
                    </div>
                </div>
                <section className="ni-buttons">
                {/* <img src={remove} className='ni-remove-input' onClick={() => this.handleRemove(finalIndex)} alt=''/> */}
                <img src={clearInputs} className='ni-clear-input' alt="clear inputs" onClick={this.handleClear.bind(this)}/>
                <img src={add} className='ni-add-input' onClick={(e) => this.addIngredient(e)} alt=''/>

                {searchIngredients ?
            
            <Link to={`/results/${searchIngredients}`}><img src={search} className='ni-img' alt=''/></Link> :

            <img src={search} onClick={this.handleAlert.bind(this)} className='ni-img' alt=''/>
               
            }
            
            </section>
            </div>

            )
    }
}

export default NewIngredients;



//source for dynamic input fields info : https://www.youtube.com/watch?v=9IhsYu4eKJ8