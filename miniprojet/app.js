const express = require('express');
const userRoutes = require('./Users');
const rdvRoutes = require('./Rdev');
const centreRoutes = require('./Centre');
const creneauRoutes = require('./Creneau');

const app = express();
app.use(express.json());

// Utilisation des routes pour les utilisateurs
app.use('/user', userRoutes);

// Utilisation des routes pour les rendez-vous
app.use('/rdv', rdvRoutes);

// Utilisation des routes pour les centres de santé
app.use('/centre', centreRoutes);
app.use('/creneau', creneauRoutes);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});