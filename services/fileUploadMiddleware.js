const multer = require('multer');

// Configuration de Multer
const storage = multer.memoryStorage(); // Stockage en mémoire
const upload = multer({ storage });

module.exports = upload;