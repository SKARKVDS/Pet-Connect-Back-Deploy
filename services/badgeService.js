const badgeRepository = require("../repositories/badgeRepository");

exports.getAllBadges = async () => {
    return await badgeRepository.getAllBadges();
};

exports.getBadgeLowerX = async (x) => {
    return await badgeRepository.getBadgeLowerX(x);
};

exports.updateBadge = async (data) => {
    return await badgeRepository.updateBadge(data);
};

exports.addBadge = async (data) => {
    return await badgeRepository.addBadge(data);
};

exports.deleteBadgeById = async (badgeId) => {
    return await badgeRepository.deleteBadgeById(badgeId);
};


