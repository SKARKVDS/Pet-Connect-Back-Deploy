const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PostRepository {
    async getAllPostsByTopicId(topicId) {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    topicId: topicId,
                },
                include: {
                    user: true
                },
                orderBy: {
                    creationTime: 'desc', // Trie par creationTime en ordre décroissant
                },
            });

            const transformedPosts = posts.map(post => ({
                ...post,
                creationTime: post.creationTime.toString(),  // Convertir BigInt en string
            }))

            return transformedPosts;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async updatePost(data) {
        try {
            const post = await prisma.post.update({
                where: { id: data.id },
                data: data,
                include: {
                    user: true
                }
            });

            const postWithStringBigInt = {
                ...post,
                creationTime: post.creationTime.toString(), // Convertir BigInt en string// Convertir BigInt en string
            };

            return postWithStringBigInt;
        } catch (error) {
            console.error("Erreur lors de la modification du post", error);
            throw error;
        }
    }

    async addPost(data) {
        try {
            const post = await prisma.post.create({
                data: data,
                include: {
                    user: true
                }
            });

            const postWithStringBigInt = {
                ...post,
                creationTime: post.creationTime.toString(), // Convertir BigInt en string// Convertir BigInt en string
            };

            return postWithStringBigInt;
        } catch (error) {
            console.error("Erreur lors de la création du post", error);
            throw error;
        }
    }

    async deletePostById(postId) {
        try {
            const deletedPost = await prisma.post.delete({
                where : {
                    id: postId,
                }
            });

            return deletedPost;
        } catch (error) {
            console.error("Erreur lors de la suppression du post", error);
            throw error;
        }
    }
}

module.exports = new PostRepository();
