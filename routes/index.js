const express = require('express');
const router = express.Router();
const promisePool = require('../utils/db');

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query(`
    SELECT ja15forum.*, ja15users.name AS username
    FROM ja15forum
    JOIN ja15users ON ja15forum.authorId = ja15users.id;`);
    res.render('index.njk', {
        rows: rows,
        title: 'Forum',
    });
});

router.get('/post/:id', async function (req, res) {
    const [rows] = await promisePool.query(
        `SELECT ja15forum.*, ja15users.name AS username
        FROM ja15forum
        JOIN ja15users ON ja15forum.authorId = ja15users.id
        WHERE ja15forum.id = ?;`,
        [req.params.id]
    );

    res.render('post.njk', {
        post: rows[0],
        title: 'Forum',
    });
});

module.exports = router;
