import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../navbar/navbar';
import add from '../images/add.svg';
import remove from '../images/remove.svg';
import search from '../images/search.svg';

class Profile extends Component{
    constructor() {
        super()

        this.state = {
            myIngredients: ['tomato', 'potato', 'carrot', 'onion']
        }
        this.handleRemove=this.handleRemove.bind(this);
        this.handleWarning=this.handleWarning.bind(this);
    }

    componentDidMount(){
        axios.get('/api/ingredients/getItem').then(res=>
            this.setState({myIngredients:res.data}))
    }

    //add new input field
    addInput() {
        this.setState({ myIngredients: [...this.state.myIngredients, ''] })
    }

    //remove input field
    handleDelete(index) {
        this.state.myIngredients.splice(index, 1)
        this.setState({ myIngredients: this.state.myIngredients })
    }

    handleInput(e, index) {
        this.state.myIngredients[index] = e.target.value
        this.setState({ myIngredients: this.state.myIngredients })
    }

    //update database with new ingredients
    handleUpdate(){
        const {myIngredients}=this.state
        axios.post('/api/ingredients/addItem',{myIngredients})
    }

    //remove individual ingredients from database
    handleRemove(index){
        axios.delete(`/api/ingredients/deleteItem/${index}`).then(res=>this.setState({myIngredients:res.data}))
    }
    
    handleWarning(){
        alert("please enter an ingredient")
    }
 
    render(){
        const newIngredient = this.state.myIngredients.map((ingredient,index)=>{
            return (
                <div key={index}>
                <input className='prof-input' value = {ingredient} onChange={(e)=>this.handleInput(e,index)}/>
                <button className='prof-remove-ingredient'onClick={(index)=>this.handleRemove(index)}>Remove from DB</button>
                </div>
            )
        })
        
        const lastIndex = newIngredient.length - 1; 
        let queryIngredients = '';
        
        let {myIngredients} = this.state;
        for(let i = 0; i<myIngredients.length; i++){
            if(myIngredients[i]){
                queryIngredients += myIngredients[i] + ','
            }
        } 
        

        return(
            <div>
            <Nav />
            <h3>
                enter the ingredients you have in your fridge and cupboards so you can easily search for recipes in the future
            </h3>
            {newIngredient}
            <section className="prof-buttons">
            {this.state.myIngredients[lastIndex]===''?
            <img src={remove} className="prof-remove-input" 
            onClick={()=>this.handleDelete(lastIndex)}
            />:
            <img src={remove} className="prof-remove-input"/>
            }
            <img src={add} className='prof-add-input' onClick={(e) => this.addInput(e)}/>
            <button onClick={this.handleUpdate}>Update Saved Ingredients</button>
                {queryIngredients ?
            
            <Link to={`/results/${queryIngredients}`}><img src={search} className='prof-img'/></Link> :

            <img src={search} onClick={this.handleWarning} className='prof-img'/>
               
            }
            </section>
            </div>
        )
    }
}

export default Profile;