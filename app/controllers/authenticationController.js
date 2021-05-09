const User = require('../models/userModel');

exports.login = function(req, res){
    const {name, password} = req.body;

    if(name && password){
        User.findByName(name, (error, user) => {
            if(error) res.render('login.ejs', {error: 'Une erreur est survenue.'})
            else if(user){
                if(user.password === password){
                    req.session.userId = user.id;
                    console.log('Register user id into session');
                    console.log(req.session);
                    res.redirect('/');
                }else{
                    res.render('login.ejs', {error: "L'utilisateur ou le mot de passe est incorrect."});
                }
            }else{
                res.render('login.ejs', {error: "L'utilisateur ou le mot de passe est incorrect."});
            }
        });
    }else{
        res.render('login.ejs', {error: 'Requête incorrecte.'});
    }
}

exports.logout = function(req, res){
    console.log('logout');
    if(req.session) req.session.destroy();
    res.redirect('/');
}