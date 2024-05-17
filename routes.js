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

Router.get('/dashboard', UserController.dashboard);

module.exports = Router;