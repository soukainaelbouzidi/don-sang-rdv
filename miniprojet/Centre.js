const express = require('express');
const router = express.Router();
const db = require('./Db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM centre'; 
    db.query(sql, (err, centre) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des centres de santé');
        } else {
            res.status(200).json(centre);
        }
    });
});

module.exports = router;