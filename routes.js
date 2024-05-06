const express = require('express');
const Router = express.Router();

const UserController = require("./controllers/Users");

Router.get('/', UserController.index);
Router.get('/form', UserController.form);
Router.get('/register', UserController.register);

module.exports = Router;