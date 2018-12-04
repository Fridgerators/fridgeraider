import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../navbar/navbar';
import add from '../images/add.svg';
import remove from '../images/remove.svg';
import search from '../images/search.svg';
import deleteItem from '../images/delete.svg';
import sweetie from 'sweetalert2';

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            myIngredients: 
            // [],
            ['tomato', 'potato', 'carrot', 'onion'],
            addIngredients: ['']
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleWarning = this.handleWarning.bind(this);
    }

    componentDidMount() {
        axios.get('/api/ingredients/getItem').then(res =>
            this.setState({ myIngredients: res.data }))
    }

    //add new input field
    addInput() {
        this.setState({ addIngredients: [...this.state.addIngredients, ''] })
    }

    //remove input field
    handleRemove(index) {
     {index === 0 ? this.state.addIngredients.splice(index, 1,'') :this.state.addIngredients.splice(index, 1)}
        this.setState({ addIngredients: this.state.addIngredients })
    }

    handleInput(e, index) {
        this.state.addIngredients[index] = e.target.value
        this.setState({ addIngredients: this.state.addIngredients })
    }

    //add new ingredient myIngredients on state
   handleUpdate() {
    let {addIngredients,myIngredients} = this.state
    for(let i = 0; i<addIngredients.length; i++){
        if(addIngredients[i]){
        myIngredients.push(addIngredients[i])}
    }
    this.setState({myIngredients: myIngredients})
    this.setState({addIngredients: ['']})
}

    //remove from myIngredients on state
    handleDelete(ingredient) {
        let deleteIngredient = this.state.myIngredients
        deleteIngredient.splice(deleteIngredient.indexOf(ingredient),1)
        this.setState({myIngredients: deleteIngredient})
    }

    handleWarning() {
        alert("please enter an ingredient")
    }

    handleUpdateIngredients(){
        let {myIngredients} = this.state
        axios.put('/api/ingredients/editItem',{myIngredients}).then(res=>{
            this.setState({myIngredients: res.data})
        })
    }

    render() {
        console.log('add',this.state.addIngredients)
        const existingIngredients = this.state.myIngredients.map((ingredient, index) => {
            return (
                <div key={index}>
                    <input className='prof-input' value={ingredient} readOnly />
                    <button className='prof-remove-ingredient' onClick={() => this.handleDelete(ingredient)}>Remove</button>
                </div>
            )
        })

        const newIngredient = this.state.addIngredients.map((ingredient, index) => {
            return (
                <div key={index} style={{display: "flex", alignItems: "center", alignContent: "center"}}>
                    <div className='prof-input-box'>
                    <input className='prof-input' placeholder="add a new ingredient" value={ingredient} onChange={(e) => this.handleInput(e, index)} />
                </div>

                    {index===0 && ingredient !== '' ? 
                        // <div className='add-box'>
                        <div style={{display: "flex", alignItems: "center", alignContent: "center"}}>
                            <button onClick={() => this.handleUpdate(ingredient)}>Save to database</button>
                            <img src={remove} onClick={() => this.handleRemove(index)} alt=''/>
                        </div>  
                            : index===0 ?null :

                            ingredient === '' ? <img style={{marginTop: "4px"}} src={remove} onClick={() => this.handleRemove(index)} alt=''/> 

                            :
                        <div>
                            <button onClick={() => this.handleUpdate(ingredient)}>Save to database</button>
                            <img src={remove} onClick={() => this.handleRemove(index)} alt=''/>
                        </div>
                    }
                </div>
            )
        })

        console.log("add", this.state.addIngredients)
        return (
            <div className="profile-bg header-curve">
                <Nav />
                <h3 className="title">
                    enter the ingredients you have in your fridge and cupboards so you can easily search for recipes in the future
                </h3>
                <br />
                <div>
                    {existingIngredients.length?<div className='saved-items'>
                    
                        {existingIngredients}
                    
                    <h4>search recipes</h4> 
                    <button onClick={this.handleUpdateIngredients}>update database</button>
                    <Link to={`/results/${this.state.myIngredients}`}><img src={search} className='prof-img' alt=''/></Link>
                </div>
                    : null}
                </div>
                
                <br />
                <div className='add-box'>
                    <div>
                        <img src={add} className='prof-add-input' onClick={(e) => this.addInput(e)} alt=''/>
                        <Link to={`/results/${this.state.myIngredients}`}><img src={search} className='prof-img' alt=''/></Link> 
                    </div>
                    {newIngredient}
                </div>

            </div>
        )
    }
}

export default Profile;