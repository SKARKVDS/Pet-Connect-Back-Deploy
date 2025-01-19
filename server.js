// server.js
const cors = require('cors');
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { startCronJobs } = require('./services/cronService');



// Configure rate limiter
const wrapMiddleware = (middleware) => (req, res, next) => middleware(req, res, next);

const limiter = rateLimit({
    windowMs: 1000, // 1 seconds
    max: 10, // Limit each IP to 1 requests per window
    standardHeaders: true, // Enable rate limit headers
    legacyHeaders: false, // Disable deprecated headers
});

//const { sequelize } = require('./models'); // Importer sequelize depuis le fichier index.js des modèles
const routes = require('./routes');
const app = express();
const port = 7777;

const corsOptions = {
    origin: "http://localhost:3000", // Autorise seulement l'origine localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Ajout des méthodes supplémentaires
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], // Ajout des en-têtes personnalisés
    exposedHeaders: ['X-Auth-Token', 'X-Custom-Header'], // En-têtes à exposer au client
    credentials: true, // Permet l'envoi de cookies et d'informations d'authentification
    maxAge: 86400, // CORS prévols mis en cache pour 24 heures
}



// Autoriser les requêtes CORS
app.use(cors(corsOptions));

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Servir les fichiers statiques de Vue.js
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/api', wrapMiddleware(limiter));

app.use('/api',routes);

startCronJobs();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

