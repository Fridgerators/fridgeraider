let ingredients = ['tomato', 'eggs', 'bacon'];

const recipes = [

    {
        "id": 504291,
        "title": "Crockpot Honey Mustard Chicken",
        "image": "https://spoonacular.com/recipeImages/504291-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 10682
    },
    {
        "id": 251165,
        "title": "Perpetual Soup: The Easiest Bone Broth You’ll Make",
        "image": "https://spoonacular.com/recipeImages/251165-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 9535
    },
    {
        "id": 574737,
        "title": "Garlic Herb Crock Pot Chicken",
        "image": "https://spoonacular.com/recipeImages/574737-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 1974
    }]

module.exports = {
    manageList: (ing, i) => {
        if(ing){
        ingredients = [...ing];
        return [...ingredients]
        } else {
        return [...ingredients]

        }

    },
    getIngredients: () => {
        return [...ingredients];
    },
    getRecipes: () => {
        return [...recipes]
    }
}
// export function 
// export function 
