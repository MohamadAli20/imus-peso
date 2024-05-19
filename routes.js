const express = require('express');
const Router = express.Router();

const UserController = require("./controllers/Users");
const FormController = require("./controllers/Forms");

/* For user */
Router.get('/', UserController.index);
Router.get('/apply', UserController.form);
Router.get('/register', UserController.register);
Router.post('/create', UserController.create);
Router.post('/authenticate', UserController.authenticate);
Router.post('/addInformation', FormController.add);

/* For admin */
Router.get('/dashboard/:page', UserController.dashboard);
Router.get('/dashboard', UserController.dashboard);
Router.get('/admin_apply', UserController.admin_form);
Router.post('/search/:name', UserController.search);
Router.delete('/delete/:id', UserController.delete);

module.exports = Router;