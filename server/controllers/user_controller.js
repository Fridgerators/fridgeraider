const bcrypt = require('bcryptjs');

module.exports = {

  sessionLogin: async (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
      // console.log("Session user info:" ,req.session.user)
    } else {
      // console.log('unauthorized')
      // res.redirect('/')
      res.sendStatus(401)
    }
  },

  login: async (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase();
    // check if that user already exists in our db
    const dbInstance = req.app.get('db')

    let foundUser = await dbInstance.find_user([username])
      .catch((err) => {
        console.log(err)
      })


    if (foundUser[0]) {
      // found user existing in the db, put returned user on session
      if (bcrypt.compareSync(password, foundUser[0].password)) {
        let user = {
          user_id: foundUser[0].user_id,
          username: foundUser[0].username
        }
        // Passwords match
        req.session.user = user;
        res.status(200).send(req.session.user)
      } else {
        // Passwords don't match
        res.status(401).send('Username or password entered was incorrect')
      }
    } else {
      // Username or password do not match
      res.status(401).send('Username or password entered was incorrect')
    }
  },
  register: async (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase();
    // check if that user already exists in our db
    const dbInstance = req.app.get('db')
    let foundUser = await dbInstance.find_user([username])
      .catch((err) => {
        console.log(err)
      })
    if (foundUser[0]) {

      res.status(400).send('That username is unavailable. Choose another one.')
    } else {
      // no user was found in the db
      let hash = bcrypt.hashSync(password, 10)
      let createdCust = await dbInstance.create_user([username, hash])
        .catch((err) => {
          console.log(err)
        })
      let user = {
        user_id: createdCust[0].user_id,
        username: createdCust[0].username
      }
      req.session.user = user;
      await dbInstance.create_ingredient_list([user.user_id])
      res.status(200).send(req.session.user)
    }

  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200)
  },
  delete: async (req, res) => {
    let { username, password } = req.body;
    // username = username.toLowerCase();
    const dbInstance = req.app.get('db')
    let foundUser = await dbInstance.find_user([username])
      .catch((err) => {
        console.log(err)
      })

    if (foundUser[0]) {
      if (bcrypt.compareSync(password, foundUser[0].password)) {
        await dbInstance.delete_user([foundUser[0].user_id])
        .catch((err) => {
          console.log(err)
        })
        req.session.destroy();
        res.status(200).send('User successfully removed')
      } else {
        // Passwords don't match
        res.status(401).send('Password entered was incorrect')
      }
    } else {
      // username or password do not match
      res.status(401).send('Password entered was incorrect')
    }
  }




}
