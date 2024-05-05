const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes')

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