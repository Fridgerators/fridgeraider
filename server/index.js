//dependencies
if (process.env.NODE_ENV === 'development') { 
  require('dotenv').config() 
}
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json())

const user = require('./controllers/user_controller')
const ingredient = require('./controllers/ingredient_controller')
const recipe = require('./controllers/recipe_controller')

app.use(express.static(`${__dirname}/../build`));

let {
  PORT,
  SERVER_PORT,
  CONNECTION_STRING,
  SECRET
} = process.env;
massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('connected to DB')
})

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

//ingredient endpoints
app.get('/api/ingredients/getList', ingredient.getItem);
// app.post('/api/ingredients/addItem', ingredient.addItem);
app.put('/api/ingredients/manageList', ingredient.manageList);
// app.delete('/api/ingredients/deleteItem', ingredient.deleteItem);

//api/saved recipe endpoints
app.get('/api/recipes/getResults/:searchIngredients/:rIndex', recipe.getResults);
app.get('/api/cookbook/recipeList', recipe.recipeList);
app.get('/api/recipes/getRecipe/:id', recipe.getRecipe)
app.post('/api/cookbook/saveRecipe', recipe.saveRecipe);
app.delete('/api/cookbook/deleteRecipe/:recipeId', recipe.deleteRecipe);

// user endpoints
app.get('/auth/getUser', user.sessionLogin);
app.get('/auth/logout', user.logout);
app.post('/auth/login', user.login);
app.post('/auth/register', user.register);
// app.delete('/auth/deleteUser', user.delete);


app.listen(PORT || SERVER_PORT || 80, () => console.log(`Listening on port ${PORT || SERVER_PORT || 80}`))



