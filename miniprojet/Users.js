const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./Db');

router.post('/register', (req, res) => {
  const { nom, prenom, email, motdepasse, telephone } = req.body;
  bcrypt.hash(motdepasse, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors du hashage du mot de passe');
    } else {
      const newUser = { nom, prenom, email, motdepasse: hash, telephone };
      const sql = 'INSERT INTO client SET ?';
      db.query(sql, newUser, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la création de l\'utilisateur');
        } else {
          res.status(201).send('Utilisateur créé avec succès');
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, motdepasse } = req.body;
  const sql = 'SELECT * FROM client WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    } else {
      if (result.length === 0) {
        res.status(401).send('Utilisateur non trouvé');
      } else {
        const user = result[0];
        bcrypt.compare(motdepasse, user.motdepasse, (err, same) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la comparaison des mots de passe');
          } else {
            if (same) {
              const token = jwt.sign({ email: user.email }, 'souka@', { expiresIn: '9h' }); 
              res.status(200).json({ token, userId: user.id });
            } else {
              res.status(401).send('Mot de passe incorrect');
            }
          }
        });
      }
    }
  });
});


router.get('/', (req, res) => {
  const sql = 'SELECT * FROM client';
  db.query(sql, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.status(200).json(client);
    }
  });
});
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM client WHERE id = ?';
  db.query(sql, [userId], (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    } else {
      if (user.length === 0) {
        res.status(404).send('Utilisateur non trouvé');
      } else {
        res.status(200).json(user[0]);
      }
    }
  });
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, email, telephone } = req.body;
  const sql = 'UPDATE client SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?';
  db.query(sql, [nom, prenom, email, telephone, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
    } else {
      res.status(200).send('Utilisateur mis à jour avec succès');
    }
  });
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM client WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
    } else {
      res.status(200).send('Utilisateur supprimé avec succès');
    }
  });
});


module.exports = router;
