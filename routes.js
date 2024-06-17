const express = require('express');
const Router = express.Router();

const UserController = require("./controllers/Users");
const FormController = require("./controllers/Forms");
const User = require('./models/User');

/* For user */
Router.get('/', UserController.index);
Router.get('/apply', UserController.form);
Router.get('/register', UserController.register);
Router.post('/create', UserController.create);
Router.post('/authenticate', UserController.authenticate);
Router.post('/addInformation', FormController.add);
Router.post('/updateInformation', FormController.update);
Router.get('/notification/:id', FormController.get_notification)
Router.get('/peso', UserController.peso);
Router.get('/about', UserController.about);

Router.get('/check_form/:id', FormController.check_form);

/* For admin */
Router.get('/dashboard/:page', UserController.dashboard);
Router.get('/dashboard', UserController.dashboard);

Router.get('/view_application/:id', FormController.admin_form);
Router.get('/admin_apply', UserController.admin_apply);
Router.get('/data_analytics', UserController.data_analytics);
Router.post('/search/:name', FormController.search);
Router.delete('/delete/:id', FormController.delete);
Router.get('/count_form', FormController.count_form);
Router.get('/count_male', FormController.count_male);
Router.get('/count_female', FormController.count_female);
Router.get('/get_top_five_occupation', FormController.get_top_five_occupation);
Router.get('/get_top_five_location', FormController.get_top_five_location);
Router.get('/get_top_unemployed', FormController.get_top_unemployed);
Router.get('/get_top_employed', FormController.get_top_employed);
Router.get('/get_top_company', FormController.get_top_company);
Router.get('/get_top_position', FormController.get_top_position);
Router.get('/get_top_age', FormController.get_top_age);
Router.get('/retrieve_by_id/:id', FormController.retrieve_application_by_id);
Router.get('/download_form/:id', FormController.download_form);

module.exports = Router;