import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../navbar/navbar';

class Cookbook extends Component {
    constructor() {
        super()
        this.state = {
            myRecipes:[]
        }
    }

    // componentDidMount(){
    //     axios.get()
    // }


    render() {

        let favRecipes = this.state.myRecipes.map((element,index)=>{
            return (
                <div key={index}>
                <img src={element.recipe.image} alt='' />
                    <h4>{element.recipe.label}</h4>
                    <div className='nr-tab'>
                        <input type="checkbox" name='tabs' />
                        <label>see ingredients and instructions</label>
                        <div className='nr-tab-content'>
                            <p>{element.recipe.ingredientLines}</p>
                            <h5>for full instructions please visit {element.recipe.url}</h5>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='cookbook-bg header-curve'>
                <Nav />
                {favRecipes}
            </div>
        )
    }
}

export default Cookbook;