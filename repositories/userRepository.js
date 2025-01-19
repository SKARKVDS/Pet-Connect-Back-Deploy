const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    async checkUserExistById(userId) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            return !!user;
        } catch (error) {
            console.error("Erreur lors de la vérification de l'user par ID", error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany({
                include:{
                    proposals: true,
                    pets: true,
                }
            });

            return users;
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    }

    async addUser(data) {
        try {
            const user = await prisma.user.create({
                data: data,
            });
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include:{
                    badge: true,
                }
            });
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
            return user;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw error;
        }
    }

    async getUserByUserName(userName) {
        try {
            const user = await prisma.user.findUnique({
                where: { userName: userName },
            });
            return user;
        } catch (error) {
            console.error("Error fetching user by userName:", error);
            throw error;
        }
    }

    async getUserByPhoneNumber(phoneNumber) {
        try {
            const user = await prisma.user.findUnique({
                where: { phoneNumber: phoneNumber },
            });
            return user;
        } catch (error) {
            console.error("Error fetching user by phoneNumber:", error);
            throw error;
        }
    }

    async updateUserAdmin(data) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: data.id },
                data: data,
                include:{
                    badge: true,
                    proposals: true,
                    pets: true,
                }

            });
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    // Mettre à jour un utilisateur
    async updateUser(data) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: data.id },
                data: data,
                include:{
                    badge: true,
                }
            });
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    async incrementServiceById(userId) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    countService: {
                        increment: 1, // Incrémente le champ `countService` de 1
                    },
                },
            });
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }


    // Supprimer un utilisateur
    async deleteUser(userId) {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id: userId },
            });
            return deletedUser;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    async deleteUserImage(userId) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    url: null
                },
                include:{
                    proposals: true,
                    pets: true,
                }
            });
            return updatedUser;
        } catch (error) {
            console.error("Error deleting user image", error);
            throw error;
        }
    }
}

module.exports = new UserRepository();