const photoRepository = require('../repositories/photoRepository');

exports.getAllPhotosByReservationId = async (reservationId) => {
    return await photoRepository.getAllPhotosByReservationId(reservationId);
};

exports.addPhoto = async (data) => {
    return await photoRepository.addPhoto(data);
};

exports.deletePhotoById = async (photoId) => {
    return await photoRepository.deletePhotoById(photoId);
};