module.exports = 

{

  login: (req,res) => {
    
    if (req.session.user){
        res.status(200).send(req.session.user)
        // console.log("Session user info:" ,req.session.user)
    } else {
        console.log('unauthorized')
        res.redirect('/')
    }
  }




}
