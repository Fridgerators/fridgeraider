module.exports = {
    //get list of saved ingredients
    getItem: async (req, res) => {
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.get_ingredients([req.session.user.user_id])
        res.status(200).send(ingredients)

    },
    //add an ingredient to your pantry
    addItem: async (req, res) => {
        const { ingredient } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.add_ingredient([req.session.user.user_id, ingredient])
        res.status(200).send(ingredients)

    },
    //edit an ingredient in your pantry
    editItem: async (req, res) => {
        const { ingredient, ingredientId } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.edit_ingredient([ingredientId, ingredient])
        res.status(200).send(ingredients)
        
    },
    //remove an ingredient from your pantry
    deleteItem: async (req, res) => {
        const { ingredientId } = req.body;
        const dbInstance = req.app.get('db')
        let ingredients = await dbInstance.delete_ingredient([ingredientId])
        res.status(200).send(ingredients)

    }
}