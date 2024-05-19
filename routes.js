const express = require('express');
const Router = express.Router();

const UserController = require("./controllers/Users");
const FormController = require("./controllers/Forms");

Router.get('/', UserController.index);
Router.get('/apply', UserController.form);
Router.get('/register', UserController.register);
Router.post('/create', UserController.create);
Router.post('/authenticate', UserController.authenticate);
Router.post('/addInformation', FormController.add);

Router.get('/dashboard/:page', UserController.dashboard);
Router.get('/dashboard', UserController.dashboard);
Router.post('/search/:name', UserController.search);
Router.delete('/delete/:id', UserController.delete);

module.exports = Router;