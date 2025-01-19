const nodemailer = require('nodemailer');

// Créer un transporteur pour envoyer l'email
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou un autre service comme 'hotmail', 'smtp.mailtrap.io', etc.
    auth: {
        user: 'petconnect710@gmail.com',  // Remplace par ton email
        pass: 'Simon123*123'      // Remplace par ton mot de passe
    }
});

// Configuration de l'email
exports.sendMail = async (password, receiver) => {
    const mailOptions = {
        from: 'petconnect710@gmail.com',  // Expéditeur
        to: receiver, // Destinataire
        subject: 'Reset Password',
        text: 'Your new password is : ' + password    // Corps du message
    };

// Envoi de l'email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Erreur:', error);
        } else {
            console.log('Email envoyé:', info.response);
        }
    });
}