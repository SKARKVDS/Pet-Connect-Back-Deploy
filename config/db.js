/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'E200394',
    'E200394',
    '0394', {
    host: 'asterix-intra.cg.helmo.be',
    port: 11433,
    dialect: 'mssql',
});

module.exports = sequelize;*/
/*
const { Connection , Request} = require('tedious');

// Configuration de la connexion
const config = {
    server: 'asterix-intra.cg.helmo.be',
    authentication: {
        type: 'default',
        options: {
            userName: 'E200394', // votre nom d'utilisateur
            password: '0394', // votre mot de passe
        }
    },
    options: {
        port: 11433,
        database: 'E200394', // le nom de la base de données
        encrypt: false, // Utilisé pour la connexion sécurisée
        trustServerCertificate: false // Défini sur true pour désactiver la validation SSL
    }
};

// Créer la connexion
const connection = new Connection(config);

module.exports = connection ;*/


const {DataSource} = require('typeorm');



// Créez la connexion à la base de données
const connection = new DataSource({
    type: "mssql", // ou 'mysql' si vous utilisez MySQL
    host: "asterix-intra.cg.helmo.be",
    port: 11433, // Par défaut pour PostgreSQL
    username: "E200394",
    password: "0394",
    database: "E200394",
    logging: true,
    extra: {
        trustServerCertificate: true, // Ignore SSL certificate validation (for self-signed certs)
    },
    entities: [User], // Ajoutez toutes vos entités ici
});


module.exports = connection
/*
// Connexion à la base de données
AppDataSource.initialize()
    .then(() => {
        console.log("Connexion à la base de données réussie!");
    })
    .catch((error) => {
        console.log("Erreur de connexion à la base de données", error);
    });*/