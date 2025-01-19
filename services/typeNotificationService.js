const typeNotificationRepository = require('../repositories/typeNotificationRepository');

exports.getAllTypesNotifications = async () => {
    return await typeNotificationRepository.getAllTypesNotifications();
};

exports.updateTypeNotification = async (data) => {
    return await typeNotificationRepository.updateTypeNotification(data);
};

exports.addTypeNotification = async (data) => {
    return await typeNotificationRepository.addTypeNotification(data);
};

exports.deleteTypeNotificationById = async (typeNotificationId) => {
    return await typeNotificationRepository.deleteTypeNotificationById(typeNotificationId);
};