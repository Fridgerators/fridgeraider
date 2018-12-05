const axios = require('axios');

module.exports = {
    //get search results from spoonacular api
    getResults: async (req, res) => {
        const { searchIngredients, rIndex} = req.params;
        const { REACT_APP_AppKey } = process.env;
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=${rIndex}&ingredients=${searchIngredients}`, {headers: {"X-RapidAPI-Key": REACT_APP_AppKey}} )
        .then((response) => {
        res.status(200).send(response.data)
        })
        .catch((err) => {
            res.status(400).send('An error occurred')
        })

    },
    getRecipe: async (req, res) => {
        const { id } = req.params;
        const { REACT_APP_AppKey } = process.env;
        console.log(id)
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {headers: {"X-RapidAPI-Key": REACT_APP_AppKey}} )
        .then((response) => {
        res.status(200).send(response.data)
        })
        .catch((err) => {
            res.status(400).send('An error occurred')
        })
    },
    //get recipes saved to database
    recipeList: async (req, res) => {
        const dbInstance = req.app.get('db')
        let recipes = await dbInstance.get_saved_recipes([req.session.user.user_id])
        res.status(200).send(recipes)

    },
    //will want to check and make sure recipe hasn't already been saved before
    //will also need to know the structure of incoming information so i can save the info to the database properly.
    saveRecipe: async (req, res) => {
        const { recipeId, image, title } = req.body;
        const dbInstance = req.app.get('db')
        let check = await dbInstance.check_for_recipe([req.session.user.user_id, recipeId])
        if(check[0]){
            res.status(400).send('Recipe already saved!')
        } else {
        await dbInstance.save_recipe([req.session.user.user_id, recipeId, image, title])
        res.sendStatus(200)
        }
        
    },
    deleteRecipe: async (req, res) => {
        const { recipeId } = req.params;
        const dbInstance = req.app.get('db')
        await dbInstance.delete_recipe([req.session.user.user_id, recipeId])
        let recipes = await dbInstance.get_saved_recipes([req.session.user.user_id])
        res.status(200).send(recipes)

    }
}