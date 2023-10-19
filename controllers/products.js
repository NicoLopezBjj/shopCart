const passport=require('passport')

const shop_get = async (req, res) => {
    if (req.isAuthenticated()) {
      res.render('shop', { user: req.user });
    } else {
      // Si no se autentica el usuario, te redirige a la pagina de inicio de sesion.
      res.redirect('/signin');
    }
    console.log(req.isAuthenticated())
    console.log(req.user)
  }
module.exports={
    shop_get
}