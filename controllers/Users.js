const model = require("../models/User");
const session = require('express-session');

class Users{
    /* methods render view files */
    /* for user */
    index(req, res){
        res.render('index');
    }
    form(req, res){
        res.render('form');
    }
    register(req, res){
        res.render('register');
    }
    /* for admin */
    dashboard(req, res){
        res.render('admin_dashboard');
    }

    /* methods interact with the model */
    create(req, res){
        let result = "";
        /*validate email*/
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(req.body.email);

        if(req.body.username === "" || (isValidEmail === false || req.body.email === "") || 
            req.body.password === ""|| req.body.confirm_password === ""){
            result += "Fill up all information. ";
        }
        if(req.body.password !== req.body.confirm_password){
            result += "Passwords do not match!";
        }
        if(req.body.password.length < 8 || req.body.password.length > 20){
            result += "Password length should be between 8 and 20 characters. "
        }
        if(req.body.username !== "" && req.body.email !== "" &&  isValidEmail === true && req.body.password !== "" && (req.body.password.length >= 8 && req.body.password.length < 20)){
            model.register_account(req.body, (found) => {
                console.log(found)
                if(found){
                    result = "Email is already taken. ";
                }
                else{ /*not found*/
                    result = "success";
                }
                res.render("register", { result });
            });
        }
        else{
            res.render("register", { result });
        }
    }
    authenticate(req, res){
        let result = "";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = regex.test(req.body.email);

        if(req.body.email === "" || req.body.password === ""){
            result += "Fill in all the required information. ";
        }
        if(isValidEmail === false){
            result += "Email is invalid ";
        }
        if(req.body.email !== "" && req.body.password !== ""){
            model.verify_account(req.body, (error, verified, information) => {
                if(error){
                    console.error(error);
                    return;
                }
                if(verified){
                    /* Store in session */
                    req.session.username = information.username;
                    res.json({ success: true, username: information.username });
                }
                if(!verified){
                    result = "Login Failed";
                    res.send(result);
                }
            });
        }
        else {
            res.send(result); // Render result without verification
        }
    }
}

module.exports = new Users;