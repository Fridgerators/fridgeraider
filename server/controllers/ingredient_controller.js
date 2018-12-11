module.exports = {
    //get list of saved ingredients
    getItem: async (req, res) => {
        const dbInstance = req.app.get('db')
        if (req.session.user) {
            let ingredients = await dbInstance.get_ingredients([req.session.user.user_id])
            res.status(200).send(ingredients)
        } else {
        res.status(200).send('Log in to get your list of ingredients')
        }

    },
    //add an ingredient to your pantry
    manageList: async (req, res) => {
        const { ingredient } = req.body;
        const dbInstance = req.app.get('db')
        if (req.session.user) {
            let ingredients = await dbInstance.manage_ingredients([req.session.user.user_id, ingredient])
            res.status(200).send(ingredients)
        } else {
            res.status(400).send('Log in to save your list!')
        }

    },
    // addItem: async (req, res) => {
    //     const { ingredient } = req.body;
    //     const dbInstance = req.app.get('db')
    //     let ingredients = await dbInstance.add_ingredient([req.session.user.user_id, ingredient])
    //     .catch((err) => {
    //         console.log(err)
    //     })
    //     res.status(200).send(ingredients)

    // },
    // //edit an ingredient in your pantry
    // editItem: async (req, res) => {
    //     const { ingredient, ingredientId } = req.body;
    //     const dbInstance = req.app.get('db')
    //     let ingredients = await dbInstance.edit_ingredient([req.session.user.user_id, ingredient])
    //     res.status(200).send(ingredients)

    // },
    //remove an ingredient from your pantry
    // deleteItem: async (req, res) => {
    //     const { ingredientId } = req.body;
    //     const dbInstance = req.app.get('db')
    //     let ingredients = await dbInstance.delete_ingredient([ingredientId])
    //     res.status(200).send(ingredients)

    // }
}