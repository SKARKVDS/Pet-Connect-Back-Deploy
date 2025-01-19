const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class ForumRepository {
    async checkForumExistById(forumId) {
        try {
            const forum = await prisma.forum.findUnique({
                where: {
                    id: forumId,
                },
            });

            return !!forum;
        } catch (error) {
            console.error("Erreur lors de la vérification du forum par ID", error);
            throw error;
        }
    }

    async getAllForums() {
        try {
            const forums = await prisma.forum.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            topics: true,  // Compte le nombre de topics associés à chaque forum
                        },
                    },
                }

            })

            return forums;
        } catch (error) {
            console.error("Erreur lors de la récupération des forums avec comptes des topics", error);
            throw error;
        }
    }


    async getByTopicId(topicId) {
        try {
            const forum = await prisma.topic.findUnique({
                where: {
                    id: topicId,
                },
                select: {
                    forum: true, // Inclut le forum lié
                },
            });

            return forum?.forum;
        } catch (error) {
            console.error("Erreur lors de la récupération des topics d'un forum avec comptes des posts", error);
            throw error;
        }
    }

    async updateForum(data) {
        try {
            const forum = await prisma.forum.update({
                where: { id: data.id },
                data: data,
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            topics: true,  // Compte le nombre de topics associés à chaque forum
                        },
                    },
                }
            });

            return forum;
        }catch (error){
            console.error('Erreur lors de la modification du forum',error);
            throw error;
        }
    }

    async addForum(data) {
        try {
            const forum = await prisma.forum.create({
                data: data,
            });

            return forum;
        } catch (error) {
            console.error("Erreur lors de la création du forum", error);
            throw error;
        }
    }

    async deleteForumById(forumId) {
        try {
            const forum = await prisma.forum.delete({
                where : {
                    id: Number(forumId),
                }
            });

            return forum;
        } catch (error) {
            console.error("Erreur lors de la suppression du forum", error);
            throw error;
        }
    }

}

module.exports = new ForumRepository();
