import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../navbar/navbar';
import add from '../images/add.svg';
import remove from '../images/remove.svg';
import search from '../images/search.svg';
import deleteItem from '../images/delete.svg';
import swal from 'sweetalert2';
import save from '../images/save.svg';

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            myIngredients: ['']
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        axios.get('/api/ingredients/getList').then(res => {
            if (res.data[0].ingredient && res.data[0].ingredient.length>0) {
                this.setState({ myIngredients: res.data[0].ingredient })
            }
        }
        )
    }

    //add new input field and update this.state.myIngredients
    addInput() {
        this.setState({ myIngredients: [...this.state.myIngredients, ''] })
    }

    handleInput(e, index) {
        this.state.myIngredients[index] = e.target.value
        this.setState({ myIngredients: this.state.myIngredients })
    }

    //add ingredients on DB
    async handleUpdate(myIngredients) {
        // let {myIngredients} = this.state
        let saveIngredients = [];
        for (let i = 0; i < myIngredients.length; i++) {
            if (myIngredients[i]) {
                saveIngredients.push(myIngredients[i])
            }
        }
        console.log('saveIngredients', saveIngredients);
    let res= await axios.put('/api/ingredients/manageList', { ingredient: saveIngredients})
            if (res.data[0].ingredient && res.data[0].ingredient.length>0) {
                this.setState({ myIngredients: res.data[0].ingredient })
            }
    await swal('your saved ingredients list has been updated')
    }

    //remove from myIngredients on state
    handleDelete(ingredient) {
        let deleteIngredient = this.state.myIngredients
        deleteIngredient.splice(deleteIngredient.indexOf(ingredient), 1)
        this.setState({ myIngredients: deleteIngredient })
    }

    render() {
        console.log('add', this.state.myIngredients)
        const existingIngredients = this.state.myIngredients.map((ingredient, index) => {
            return (
                <form key={index} style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
                
                    <input className='prof-input' type="text" value={ingredient} onChange={(e) => this.handleInput(e, index)} />
                    
                    <img src={deleteItem} className='prof-remove-ingredient' onClick={() => this.handleDelete(ingredient)} alt="delete an ingredient" />
                </form>
            )
        })


        console.log("add", this.state.myIngredients)
        return (
            <div className="profile-bg header-curve">
                <Nav />
                <h3 className="title">
                    enter the ingredients you have in your fridge and cupboards so you can easily search for recipes in the future
                </h3>
                <br />
                <div >
                    {existingIngredients.length ?
                        <div className='existing-items' >
                            {existingIngredients}
                        </div> : null}
                    <div className='prof-btns'>
                        <img src={save} onClick={() => this.handleUpdate(this.state.myIngredients)} alt="save my ingredients"/>
                        <img src={add} className='prof-add-input' onClick={(e) => this.addInput(e)} alt="add input box" />
                        <Link to={`/results/${this.state.myIngredients}`}><img src={search} className='prof-img' alt='' /></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;