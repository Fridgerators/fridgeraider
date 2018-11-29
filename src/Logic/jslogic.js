module.exports={

recipeBook: (book,recipe)=>{
    let newBook = [...book]
    let newRecipe = {...recipe};
    let found = false;
    

    
    newBook=newBook.map(element=>{
        if(element.id===recipe.id){
            let newRecipe={...recipe}
            found=true;
            return newRecipe;
        }
        return recipe;
    })
    if(!found){
        newBook.push(newRecipe)
    }
    return newBook
}
}

