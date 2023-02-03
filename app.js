require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});