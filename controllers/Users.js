class Users{
    index(req, res){
        res.render('index');
    }
    form(req, res){
        res.render('form');
    }
}

module.exports = new Users;