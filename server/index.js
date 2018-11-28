require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json())

let {
  SERVER_PORT,
  CONNECTION_STRING,
  SECRET
} = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
})

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

//ingredient endpoints
app.get('/api/ingredients/getItem');
app.post('/api/ingredients/addItem');
app.put('/api/ingredients/editItem');
app.delete('/api/ingredients/deleteItem');

//api recipe endpoints
app.get('/api/recipes/getResults');
app.post('/api/recipes/saveRecipe');

// user endpoints
app.get('/api/user/getUser');
app.post('/api/user/updateUser');
app.delete('/api/user/deleteUser');

//saved recipes endpoints
app.get('/api/cookbook/recipeList');
app.delete('/api/cookbook/deleteRecipe');


app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})


