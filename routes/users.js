const express = require('express');
const router = express.Router();
const promisePool = require('../utils/db');

router.get('/', async function (req, res) {
    res.send("Alla users i systemets");
});

router.get('/:slug/:id', async function (req, res) {
    console.log(req.params.slug);

    const [rows] = await promisePool.query(`
    SELECT * FROM ja15users WHERE id = ?`, [req.params.id]);
    res.json({ id: req.params.id, user: rows[0] });
});

module.exports = router;