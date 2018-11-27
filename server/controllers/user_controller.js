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
    let { username, password } = req.body
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
      // email or password do not match
      res.status(401).send('Username or password entered was incorrect')
    }
  },
  register: async (req, res) => {
    let { username, password } = req.body
    // check if that user already exists in our db
    const dbInstance = req.app.get('db')
    let foundUser = await dbInstance.check_users([username])
      .catch((err) => {
        console.log(err)
      })
    if (foundUser[0]) {

      res.sendStatus(400)
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
      res.status(200).send(req.session.user)
    }

  },
  logout: async (req, res) => {
      req.session.destroy();
      res.sendStatus(200)
  }




}
