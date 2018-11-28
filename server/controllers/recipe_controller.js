module.exports = {
    //get search results from edamam api
    getResults: async (req, res) => {
        const {  }
        const dbInstance = req.app.get('db')
        let recipes = await dbInstance.get_recipes([req.session.user.user_id])
        res.status(200).send(recipes)

    },
    //get recipes saved to database
    recipeList: async (req, res) => {
        const { ingredient } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.get_saved_recipes([req.session.user.user_id, ingredient])
        res.status(200).send(ingredients)

    },
    //will want to check and make sure recipe hasn't already been saved before
    saveRecipe: async (req, res) => {
        const { ingredient, recipeId } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.save_recipe([req.session.user.user_id, ingredientId, ingredient])
        res.status(200).send(ingredients)
        
    },
    deleteRecipe: async (req, res) => {
        const { recipeId } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.delete_recipe([req.session.user.user_id, ingredientId])
        res.status(200).send(ingredients)

    }
}