const express = require('express');
const conn = require('./Db');

const router = express.Router();

router.post('/', (req, res) => {
    const { date, heure_debut, heure_fin, client_id, centre_id, creneau_id } = req.body;

    const sqlCountRdv = 'SELECT COUNT(*) AS count_rdv FROM rdv2 WHERE centre_id = ? AND date = ? AND creneau_id= ?';

    conn.query(sqlCountRdv, [centre_id, date, creneau_id], (err, resultCountRdv) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération du nombre de rendez-vous');
        } else {
            const count_rdv = resultCountRdv[0].count_rdv;
            
            console.log('Nombre de rendez-vous:', count_rdv);

            const sqlCapaciteCentre = 'SELECT C.capacite AS capacite FROM centre C WHERE C.id = ?';

            conn.query(sqlCapaciteCentre, [centre_id], (err, resultCapacite) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erreur lors de la récupération de la capacité du centre');
                } else {
                    const capacite = resultCapacite[0].capacite;
                    console.log('Capacité du centre:', capacite);

                    let statut;
                    if (count_rdv < capacite) {
                        statut = 'accepter';
                    } else {
                        statut = 'rejeter';
                    }

                    console.log('Heure de début du rendez-vous:', heure_debut);
                    console.log('Heure de fin du rendez-vous:', heure_fin);

                    const sqlInsertRdv = 'INSERT INTO rdv2 (date, statut, client_id, centre_id, creneau_id, heure_debut, heure_fin) VALUES (?, ?,?, ?, ?, ?, ?)';
                    conn.query(sqlInsertRdv, [date, statut, client_id, centre_id, creneau_id, heure_debut, heure_fin], (err, resultInsertRdv) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Erreur lors de l\'insertion du rendez-vous');
                        } else {
                            res.status(201).send('Rendez-vous inséré avec succès');
                        }
                    });
                }
            });
        }
    });
});
router.get('/', (req, res) => {
    conn.query('SELECT * FROM rdv2', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM rdv2 WHERE client_id = ?';
    conn.query(sql, [userId], (err, rdvs) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des rendez-vous de l\'utilisateur');
        } else {
            res.status(200).json(rdvs);
        }
    });
});

router.put('/putrdv/:id', (req, res) => {
    const rdvId = req.params.id;
    const { date, heure_debut, heure_fin ,centre_id} = req.body;

    const sqlCountRdv = 'SELECT COUNT(*) AS count_rdv FROM rdv WHERE centre_id = ? AND date = ?';

    db.query(sqlCountRdv, [centre_id, date], (err, resultCountRdv) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération du nombre de rendez-vous');
        } else {
            const count_rdv = resultCountRdv[0].count_rdv;
            console.log('Nombre de rendez-vous:', count_rdv);

            const sqlCapaciteCentre = 'SELECT C.capacite AS capacite FROM centre C WHERE C.id = ?';

            db.query(sqlCapaciteCentre, [centre_id], (err, resultCapacite) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erreur lors de la récupération de la capacité du centre');
                } else {
                    const capacite = resultCapacite[0].capacite;
                    console.log('Capacité du centre:', capacite);

                    let etat_rdv;
                    if (count_rdv < capacite) {
                        etat_rdv = 'valider';
                    } else {
                        etat_rdv = 'non valider';
                    }

                    const sqlUpdateRdv = 'UPDATE rdv2 SET date = ?, heure_debut = ?, heure_fin = ?, statut = ? WHERE id = ?';
                    db.query(sqlUpdateRdv, [date, heure_debut, heure_fin, statut, rdvId], (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Erreur lors de la mise à jour du rendez-vous');
                        } else {
                            res.status(200).send('Rendez-vous mis à jour avec succès');
                        }
                    });
                }
            });
        }
    });
});

router.get('/count', (req, res) => {
    const { centre_id, creneau_id, date, statut } = req.query;
    conn.query('SELECT COUNT(*) AS count FROM rdv2 WHERE centre_id = ? AND creneau_id = ? AND date = ? AND statut = ?', [centre_id, creneau_id, date, statut], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors du comptage des rendez-vous');
        } else {
            res.json({ count: results[0].count });
        }
    });
});

router.patch('/:id', (req, res) => {
    const rdvId = req.params.id;
    const { statut } = req.body;
    conn.query('UPDATE rdv2 SET statut=? WHERE id=?', [statut, rdvId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la mise à jour du statut du rendez-vous');
        } else {
            res.status(200).send('Statut du rendez-vous mis à jour avec succès');
        }
    });
});

router.delete('/:id', (req, res) => {
    const rdvId = req.params.id;
    conn.query('DELETE FROM rdv2 WHERE id=?', [rdvId], (error, results) => {
        if (error) throw error;
        res.status(200).send('Rendez-vous supprimé avec succès');
    });
});

module.exports = router;
