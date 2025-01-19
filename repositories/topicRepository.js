const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TopicRepository {
    async checkTopicExistById(topicId) {
        try {
            const topic = await prisma.topic.findUnique({
                where: {
                    id: topicId,
                },
            });

            return !!topic;
        } catch (error) {
            console.error("Erreur lors de la vérification du topic par ID", error);
            throw error;
        }
    }

    async getAllTopicsWithPostCountsByForumId(forumId) {
        try {
            const topics = await prisma.topic.findMany({
                where: {
                    forumId: forumId,
                },
                select: {
                    id: true,
                    name: true,
                    creationTime: true,
                    updateTime: true,
                    _count: {
                        select: {
                            posts: true,  // Compte le nombre de topics associés à chaque forum
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            userName: true, // Fetch specific user details
                        },
                    },
                },

            })



            const transformedTopics = topics.map(topic => ({
                ...topic,
                creationTime: topic.creationTime.toString(),  // Convertir BigInt en string
                updateTime: topic.updateTime.toString(),    // Convertir BigInt en string
            }))

            return transformedTopics;
        } catch (error) {
            console.error("Erreur lors de la récupération des topics d'un forum avec comptes des posts", error);
            throw error;
        }
    }

    async updateTopic(data) {
        try {
            const topic = await prisma.topic.update({
                where: {id: data.id,},
                data: data,
                select: {
                    id: true,
                    name: true,
                    creationTime: true,
                    updateTime: true,
                    _count: {
                        select: {
                            posts: true,  // Compte le nombre de topics associés à chaque forum
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            userName: true, // Fetch specific user details
                        },
                    },
                },
            });

            const transformedTopic = {
                ...topic,
                creationTime: topic.creationTime.toString(), // Convertir BigInt en string
                updateTime: topic.updateTime.toString(),     // Convertir BigInt en string
            };

            return transformedTopic;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }


    async addTopic(data) {
        try {
            const topic = await prisma.topic.create({
                data: data,
                include: {
                    user: true, // Inclure l'utilisateur associé
                },
            });

            const transformedTopic = {
                ...topic,
                creationTime: topic.creationTime.toString(), // Convertir BigInt en string
                updateTime: topic.updateTime.toString(),     // Convertir BigInt en string
            };

            return transformedTopic;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }


    async deleteTopicById(topicId) {
        try {
            const topic = await prisma.topic.delete({
                where: {id: topicId},
            });

            const transformedTopic = {
                ...topic,
                creationTime: topic.creationTime.toString(), // Convertir BigInt en string
                updateTime: topic.updateTime.toString(),     // Convertir BigInt en string
            };

            return transformedTopic;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }
}




module.exports = new TopicRepository();
