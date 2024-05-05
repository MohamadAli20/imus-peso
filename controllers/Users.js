class Users{
    index(req, res){
        res.render('index');
    }
    form(req, res){
        res.render('form');
    }
    register(req, res){
        res.render('register');
    }
}

module.exports = new Users;