
// Verifies if the user is connected and allowed to continue
module.exports = function authenticationCheck(req, res, next){
    if(req.path === '/login' || (req.session && req.session.userId)) next();
    else{ 
        res.redirect('/login');
    }
}