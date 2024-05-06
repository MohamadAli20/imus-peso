const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')
// const session = require('express-session');
const bodyParser = require('body-parser');

// app.use(session({
//     secret: 'keyboardkitteh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }));

app.use(bodyParser.urlencoded({extended: true}));

/*serve by templates*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*serve static files*/
app.use(express.static("assets"));

app.use('/', routes);
app.use('/form', routes);
app.use('/register', routes);

app.listen(3000, () => {
    console.log('http://localhost:3000');
})