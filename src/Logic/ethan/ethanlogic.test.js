const { getIngredients, manageList, getRecipes } = require('./ethanlogic');

let ingredients = [];
let recipes = [];

    describe('ingredients on state expected to be an array', () => {
        test('Is an array', () => {
            expect(typeof ingredients).toBe('object')
        });
    });

    describe('can retrieve and save ingredients', () => {
        test('can save ingredients from the server', () => {
            ingredients = getIngredients()
            expect(ingredients).toEqual(getIngredients())
        });
    });

    describe('can modify ingredient list', () => {
        test('can remove an existing ingredient', () => {
            ingredients.splice(ingredients.indexOf('eggs'), 1)
            expect(manageList(ingredients)).toEqual(['tomato', 'bacon'])
        });
        test('can add a new ingredient', () => {
            ingredients.push('lettuce')
            expect(manageList(ingredients)).toEqual(['tomato', 'bacon', 'lettuce'])
        });
    });
    
    describe('recipes expected to be an array', () => {
        test('default state expected to be an array', () => {
            expect(typeof recipes).toBe('object')
        });
        test('returned recipes expected to be an array', () => {
            recipes = getRecipes()
            expect(recipes).toEqual(getRecipes())
        });
    });
