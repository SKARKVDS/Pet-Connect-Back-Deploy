const notificationRepository = require('../repositories/notificationRepository');

exports.getNotificationCount = async () => {
    return await notificationRepository.getNotificationCount();
};

exports.getAllNotifications = async () => {
    const notifications = await notificationRepository.getAllNotifications();

    const formattedNotifications = notifications.map((notification) => ({
      id: notification.id,
      name: notification.name,
      creatorName: notification.user.userName,
      typeName: notification.typeNotification.name,
    }))

    return formattedNotifications;
};

exports.addNotification = async (data) => {
    return await notificationRepository.addNotification(data);
};

exports.deleteNotificationById = async (notificationId) => {
    return await notificationRepository.deleteNotificationById(notificationId);
};