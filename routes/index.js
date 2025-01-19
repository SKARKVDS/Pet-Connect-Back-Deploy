const express = require('express');

const forumRoutes = require('./forumRoutes');
const topicRoutes = require('./topicRoutes');
const postRoutes = require('./postRoutes');

const userRoutes = require('./userRoutes');

const badgeRoutes = require('./badgeRoutes');
const notificationRoutes = require('./notificationRoutes');
const typeNotificationRoutes = require('./typeNotificationRoutes')

const petRoutes = require('./petRoutes');
const sexRoutes = require('./sexRoutes');
const specieRoutes = require('./specieRoutes');
const raceRoutes = require('./raceRoutes');

const vaccineRoutes = require('./vaccineRoutes');
const vaccinationRoutes = require('./vaccinationRoutes');

const proposalRoutes = require('./proposalRoutes');
const typeRoutes = require('./typeRoutes');

const planificationRoutes = require('./planificationRoutes');

const requestRoutes = require('./requestRoutes');

const reservationRoutes = require('./reservationRoutes');
const photoRoutes = require('./photoRoutes');

const router = express.Router();

// Ajouter toutes les routes ici
router.use('/user', userRoutes);

router.use('/badge', badgeRoutes);
router.use('/notification', notificationRoutes);
router.use('/typeNotification', typeNotificationRoutes);


//pets
router.use('/pet', petRoutes);
router.use('/race', raceRoutes);
router.use('/specie', specieRoutes);
router.use("/sex", sexRoutes)

//Vaccine
router.use('/vaccine', vaccineRoutes);
router.use("/vaccination", vaccinationRoutes)

//Proposal
router.use('/proposal', proposalRoutes);
router.use('/type', typeRoutes);
router.use('/planification', planificationRoutes);

//Request
router.use('/request', requestRoutes);

//
router.use('/reservation', reservationRoutes);
router.use('/photo', photoRoutes);

//Forum
router.use('/forum', forumRoutes);
router.use('/topic', topicRoutes);
router.use('/post', postRoutes);



module.exports = router;
