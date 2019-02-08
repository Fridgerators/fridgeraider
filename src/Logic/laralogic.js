let user =  {
  user_id: 10, 
  username: 'Lara'
}

let newUser = {
  user_id: 11, 
  username: 'Amy'
}

module.exports = {

  getUser: () => {
    return user
  },

  authenticateUser: () => { 
    return newUser
  },

  logOut: () => {
    return {}
  }

}