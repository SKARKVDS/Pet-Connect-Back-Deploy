const postRepository = require('../repositories/postRepository');
const topicRepository = require('../repositories/topicRepository');

exports.getAllPostsByTopicId = async (topicId) => {
    const posts = await postRepository.getAllPostsByTopicId(topicId);

    const formattedPosts = posts.map(post => ({
        id: post.id,
        body: post.body,
        creationTime: post.creationTime,
        creatorName: post.user.userName,
        creatorUrl: post.user.url
    }))

    return formattedPosts;
};

exports.updatePost = async (postData) => {
    const post =  await postRepository.updatePost(postData);

    const formattedPost = {
        id: post.id,
        body: post.body,
        creationTime: post.creationTime,
        creatorName: post.user.userName,
        creatorUrl: post.user.url
    }

    return formattedPost;
};

exports.addPost = async (postData) => {
    const post =  await postRepository.addPost(postData);

    const formattedPost = {
        id: post.id,
        body: post.body,
        creationTime: post.creationTime,
        creatorName: post.user.userName,
        creatorUrl: post.user.url
    }

    const topicData = {
        id: post.topicId,
        updateTime: post.creationTime,
    }

    await topicRepository.updateTopic(topicData);

    return formattedPost;
};

exports.deletePostById = async (postId) => {
    return await postRepository.deletePostById(postId);
};