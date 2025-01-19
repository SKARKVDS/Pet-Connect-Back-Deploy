const userService = require('../services/userService');
const mailService = require('../services/mailService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_SECRET_KEY
const roleUser = Number(process.env.UserId);
const roleAdmin = Number(process.env.AdminId);

exports.checkUserExistById = async (req, res) => {
    try {
        const exist = await userService.checkUserExistById(Number(req.params.userId));
        if(exist){
            const response = {
                content: exist,
                success: true,
                message: "User exists"
            };

            res.status(200).json(response);
        }else{
            const response = {
                content: exist,
                success: false,
                message: "User doesn't exist"
            };

            return res.status(400).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        const response = {
            content: users,
            success: true,
            message: "Liste des utilisateurs récupérée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.checkToken = async (req, res) => {
    const token = req.headers['authorization']; // Normalement dans "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        // Vérifiez le token
        const decoded = jwt.verify(token.split(' ')[1], jwt_key); // Assurez-vous que 'secret_key' correspond à celui utilisé pour signer

        res.status(200).json({
            success: true,
            message: "Token is valid user"
        });
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré', error });
    }
};

exports.checkTokenAdmin = async (req, res) => {
    const token = req.headers['authorization']; // Normalement dans "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        // Vérifiez le token
        const decoded = jwt.verify(token.split(' ')[1], jwt_key); // Assurez-vous que 'secret_key' correspond à celui utilisé pour signer
        const user = await userService.getUserRoleById(decoded.id);

        if(decoded.role === roleAdmin && user.role === roleAdmin) {
            res.status(200).json({
                content: true,
                success: true,
                message: "Token is valid admin"
            });
        }else{
            return res.status(403).json({ content: false ,success: false, message: 'Token is not admin' });
        }/*else{
            res.status(200).json({
                content: false,
                success: true,
                message: "Token is not admin"
            });
        }*/
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré', error });
    }
};



exports.getUserByToken = async (req, res) => {
    const token = req.headers['authorization']; // Normalement dans "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        // Vérifiez le token
        const decoded = jwt.verify(token.split(' ')[1], jwt_key); // Assurez-vous que 'secret_key' correspond à celui utilisé pour signer

        const user = await userService.getUserById(decoded.id);

        const response = {
            content: user,
            success: true,
            message: "User fetched by token successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré', error });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Vérification si l'utilisateur existe
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }


        // Génération du token JWT
        const token = jwt.sign({ id : user.id , role: user.roleId}, jwt_key, { expiresIn: '1y' });

        const userToken = {
            token: token,
            userName: user.userName,
            email: user.email,
            role: user.roleId
        }

        const response = {
            content: userToken,
            success: true,
            message: "Utilisateur authentifié avec succès"
        };


        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const tokenBody = jwt.decode(req.body.token);
        const userId = tokenBody.id;

        const data = {
            id: userId,
            email: req.body.email,
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
        }

        //todo verif conflict

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await userService.updateUser({
            ...data,
            password: hashedPassword,
        });

        const token = jwt.sign({ id : user.id }, 'secret_key', { expiresIn: '1y' });

        const userToken = {
            token: token,
            userName: user.userName,
            email: user.email,
            role: user.roleId
        }

        const response = {
            content: userToken,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserImage = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            url: req.file.path,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserName = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            userName: req.body.userName,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserEmail = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            email: req.body.email,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserPhoneNumber = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            phoneNumber: req.body.phoneNumber,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserFirstName = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            firstName: req.body.firstName,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserLastName = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const data = {
            id: userId,
            lastName: req.body.lastName,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const tokenEncrypted = req.header('Authorization')?.split(' ')[1];
        const token = jwt.decode(tokenEncrypted, jwt_key);
        const userId = token.id;

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = {
            id: userId,
            password: hashedPassword,
        }

        const user = await userService.updateUser(data);

        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.updateUserAdmin = async (req, res) => {
    try {

        const data = {
            id: req.body.id,
            email: req.body.email,
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            countService: Number(req.body.countService),
        }

        const user = await userService.updateUserAdmin(data);


        const response = {
            content: user,
            success: true,
            message: "Utilisateur modifié avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.deleteUserImageAdmin = async (req, res) => {
    try {
        const userIdDelete = Number(req.body.id);
        const user = await userService.deleteUserImage(userIdDelete);

        const response = {
            content: user,
            success: true,
            message: "Image de l'utilisateur supprimée avec succès"
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addUser = async (req, res) => {
    try {

        const data = {
            email: req.body.email,
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            roleId: roleUser,
            url: null,
            badgeId: null
        }

        const existingMail = await userService.getUserByEmail(data.email);
        if (existingMail) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
        }

        const existingUserName = await userService.getUserByUserName(data.userName);
        if (existingUserName) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
        }

        const existingPhoneNumber = await userService.getUserByPhoneNumber(data.phoneNumber);
        if (existingPhoneNumber) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
        }


        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userService.createUser({
            ...data,
            password: hashedPassword,
        });

        // Génération du token JWT
        const token = jwt.sign({ id : user.id, role: user.roleId }, jwt_key, { expiresIn: '1h' });

        const userToken = {
            token: token,
            userName: user.userName,
            email: user.email,
            role: user.roleId
        }

        const response = {
            content: userToken,
            success: true,
            message: "Utilisateur créé avec succès"
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement', error });
    }
};

