const express = require('express');
const router = express.Router();
const db = require('./Db');

router.get('/creneau/:centreId', (req, res) => {
  const centreId = req.params.centreId;
  const date = req.params.date;
  const sql = 'SELECT * FROM creneau WHERE centre_id = ? ';
  db.query(sql, [centreId, date], (err, creneau) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des créneaux');
    } else {
      res.status(200).json(creneau);
    }
  });
});

router.post('/creneau', (req, res) => {
  const { date, heure_debut, centre_id, nombre_rendezvous } = req.body;
  const sql = 'INSERT INTO creneau (date, heure_debut, centre_id, nombre_rendezvous) VALUES (?, ?, ?, ?)';
  db.query(sql, [date, heure_debut, centre_id, nombre_rendezvous], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la création du créneau');
    } else {
      res.status(201).send('Créneau créé avec succès');
    }
  });
});

module.exports = router;
