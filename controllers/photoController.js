const photoService = require('../services/photoService');

exports.getAllPhotosByReservationId = async (req, res) => {
    try {
        const photos = await photoService.getAllPhotosByReservationId(Number(req.params.reservationId));

        const response = {
            content: photos,
            success: true,
            message: "Photos fetched by proposal successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.addPhoto = async (req, res) => {
    try {
        const data = {
            url: req.file.path,
            description: req.body.description,
            reservationId: Number(req.body.reservationId),
        }

        const photo = await photoService.addPhoto(data);

        const response = {
            content: photo,
            success: true,
            message: "Photo added successfully",
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.deletePhotoById = async (req, res) => {
    try {
        const id = Number(req.params.photoId);
        const photo = await photoService.deletePhotoById(id);

        const response = {
            content: true,
            success: true,
            message: "Photo deleted successfully",
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
