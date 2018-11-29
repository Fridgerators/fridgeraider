const axios = require('axios');

module.exports = {
    //get search results from edamam api
    getResults: async (req, res) => {
        const { searchIngredients, rIndex} = req.params;
        const { REACT_APP_AppID, REACT_APP_AppKey } = process.env;
        console.log(rIndex)
        // const dbInstance = req.app.get('db')
        axios.get(`https://api.edamam.com/search?q=${searchIngredients}&from=${rIndex}&app_id=${REACT_APP_AppID}&app_key=${REACT_APP_AppKey}`)
        .then((response) => {
        res.status(200).send(response.data)
        })
        .catch((err) => {
            res.status(400).send('An error occurred')
        })

    },
    // getRecipe: async (req, res) => {
    //     const { uri } = req.params;
    //     const { REACT_APP_AppID, REACT_APP_AppKey } = process.env;
    //     console.log(uri)
    //     axios.get(`https://api.edamam.com/search?r=${encodeURIComponent(uri)}&app_id=${REACT_APP_AppID}&app_key=${REACT_APP_AppKey}`)
    //     .then((response) => {
    //     res.status(200).send(response.data)
    //     })
    //     .catch((err) => {
    //         res.status(400).send('An error occurred')
    //     })
    // },
    //get recipes saved to database
    recipeList: async (req, res) => {
        const dbInstance = req.app.get('db')
        let recipes = await dbInstance.get_saved_recipes([req.session.user.user_id])
        res.status(200).send(recipes)

    },
    //will want to check and make sure recipe hasn't already been saved before
    //will also need to know the structure of incoming information so i can save the info to the database properly.
    saveRecipe: async (req, res) => {
        const { ingredient, recipeId } = req.body;
        const dbInstance = req.app.get('db')
        let recipes = await dbInstance.save_recipe([req.session.user.user_id, recipeId, ingredient])
        res.status(200).send(recipes)
        
    },
    deleteRecipe: async (req, res) => {
        const { recipeId } = req.body;
        const dbInstance = req.app.get('db')
        let recipes = await dbInstance.delete_recipe([req.session.user.user_id, recipeId])
        res.status(200).send(recipes)

    }
}