const topicRepository = require('../repositories/topicRepository');

exports.checkTopicExistById = async (topicId) => {
    return await topicRepository.checkTopicExistById(topicId);
};

exports.getAllTopicsWithPostCountsByForumId = async (forumId) => {
    const topics = await topicRepository.getAllTopicsWithPostCountsByForumId(forumId);

    const formattedTopics = topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        creationTime: topic.creationTime,
        updateTime: topic.updateTime,
        creatorName: topic.user.userName,
        countPosts: topic._count.posts,
    }))

    return formattedTopics;
};

exports.updateTopic = async (data) => {
    const topic =  await topicRepository.updateTopic(data);

    const formattedTopic = {
        id: topic.id,
        name: topic.name,
        creationTime: topic.creationTime,
        updateTime: topic.updateTime,
        creatorName: topic.user.userName,
        countPosts: 0,
    }

    return formattedTopic;
};
exports.addTopic = async (data) => {
    const topic =  await topicRepository.addTopic(data);

    const formattedTopic = {
        id: topic.id,
        name: topic.name,
        creationTime: topic.creationTime,
        updateTime: topic.updateTime,
        creatorName: topic.user.userName,
        countPosts: 0,
    }

    return formattedTopic;
};

exports.deleteTopicById = async (topicId) => {
    return await topicRepository.deleteTopicById(topicId);
};
