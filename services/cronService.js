const cron = require('node-cron');
const addressService = require('../services/addressService');
const planificationService = require('../services/planificationService');

const startCronJobs = () => {
    cron.schedule('01 00 * * *', async () => {
        console.log('Tâche quotidienne exécutée à 00h01');
        console.log('clearUnusedAddresses');
        await addressService.clearUnusedAddresses()
    });
    cron.schedule('48 00 * * *', async () => {
        console.log('Tâche quotidienne exécutée à 00h02');
        console.log('clearExpiredPlanifications');
        await planificationService.clearExpiredPlanifications()
    });
};


module.exports = { startCronJobs };