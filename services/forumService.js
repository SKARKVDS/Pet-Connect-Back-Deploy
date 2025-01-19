const forumRepository = require('../repositories/forumRepository');

exports.checkForumExistById = async (forumId) => {
    return await forumRepository.checkForumExistById(forumId);
};

exports.getAllForums = async () => {
    const forums = await forumRepository.getAllForums();

    const formattedForums = forums.map(forum => ({
        id: forum.id,
        name: forum.name,
        countTopics: forum._count.topics,
    }))

    return formattedForums;
};

exports.getByTopicId = async (topicId) => {
    const forum = await forumRepository.getByTopicId(topicId);

    return forum
};


exports.updateForum = async (data) => {
    const forum = await forumRepository.updateForum(data);

    const formattedForum = {
        id: forum.id,
        name: forum.name,
        countTopics: forum._count.topics,
    }

    return formattedForum;
};

exports.addForum = async (data) => {
    const forum = await forumRepository.addForum(data);

    const formattedForums = {
        id: forum.id,
        name: forum.name,
        countTopics: 0,
    }

    return formattedForums;
};

exports.deleteForumById = async (forumId) => {
    return await forumRepository.deleteForumById(forumId);
};