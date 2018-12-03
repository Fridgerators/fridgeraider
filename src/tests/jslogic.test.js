const {recipeBook,handleDelete} = require('../Logic/jslogic');

const recipe = {
    id: 1,
    title: 'pizza',
    ingredients: ['pepperoni','cheese']
}

describe("Can add recipe to book", ()=>{
    var book= [];
    beforeEach(()=>{
        book = [];
      })

    test('book is an array of objects', ()=>{
        expect(recipeBook(book)).toEqual([{}])
    })  
    test('can add item to book', ()=>{
        expect(recipeBook(book,recipe)).toHaveLength(1)
    })
    test('returned array has correct item',()=>{
        let newBook = recipeBook(book,recipe)
        expect(newBook[0].id).toEqual(recipe.id)
    })
    
    test('should return a new recipe', ()=>{
        let newBook = recipeBook(book,recipe)
        expect(newBook).not.toBe(book);
})

describe("Can remove recipe", ()=>{
    var list=["str1","str2","str3"];

    test('can remove item', ()=>{
        expect(handleDelete(list)).toHaveLength(2)
    })
})



})
