require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const slugify = require('slugify');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

env.addFilter('slugify', (str) => {
    return slugify(str, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
});

env.addFilter('date', (date) => {
    return new Date(date).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});