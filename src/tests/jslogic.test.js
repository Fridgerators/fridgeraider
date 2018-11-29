const {recipeBook} = require('../Logic/jslogic');

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
    test('can add item to book', ()=>{
        expect(recipeBook(book,recipe)).toHaveLength(1)
    })
    test('returned array has correct item',()=>{
        let newBook = recipeBook(book,recipe)
        expect(newBook[0].id).toEqual(recipe.id)
    })
    
    test('should return a new cart', ()=>{
        let newBook = recipeBook(book,recipe)
        expect(newBook).not.toBe(book);
})





})
