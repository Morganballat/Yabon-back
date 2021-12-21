const secret = require('../services/jwt')


module.exports = function (req, res, next) {
       
    const token = req.header('auth-token')
   
    if(!token) return res.status(401).send('Accès denied');
   
    try {
       const verified = jwt.verify(token, secret.JWT_SIGN_TOKEN )

        req.user = verified

   } catch (err) {
       
    res.status(400).send("invalid token")
   }
}