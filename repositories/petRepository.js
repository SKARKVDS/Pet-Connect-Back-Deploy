const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PetRepository {
    async checkPetAccessibleByIdAndUserId(petId, userId) {
        try {
            const pet = await prisma.pet.findUnique({
                where: {
                    id: petId,
                    userId: userId
                },
            });

            return !!pet;
        } catch (error) {
            console.error("Erreur lors de la vérification du pet par Id et userId", error);
            throw error;
        }
    }

    async getAllPetsByUserId(userId) {
        try {
            const pets = await prisma.pet.findMany({
                where: {
                    userId: userId,
                    isDisable: false
                },
                include: {
                    race: {
                        include: {
                            specie: true, // Inclure des informations sur l'espèce si nécessaire
                        },
                    },
                    sex: true,
                    user: true, // Inclure des informations sur l'utilisateur si nécessaire
                },
            });

            const transformedPets = pets.map(pet => ({
                ...pet,
                birthDate: pet.birthDate.toString(), // Convertir BigInt en string
            }))

            return transformedPets;
        } catch (error) {
            console.error("Erreur lors de la récupération des pets par utilisateur", error);
            throw error;
        }
    }

    async getAllPetsByUserIdAdmin(userId) {
        try {
            const pets = await prisma.pet.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    race: {
                        include: {
                            specie: true, // Inclure des informations sur l'espèce si nécessaire
                        },
                    },
                    sex: true,
                    user: true, // Inclure des informations sur l'utilisateur si nécessaire
                },
            });

            const transformedPets = pets.map(pet => ({
                ...pet,
                birthDate: pet.birthDate.toString(), // Convertir BigInt en string
            }))

            return transformedPets;
        } catch (error) {
            console.error("Erreur lors de la récupération des pets par utilisateur", error);
            throw error;
        }
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- UPDATE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    async updatePet(data) {
        try {
            const pet = await prisma.pet.update({
                where: { id: data.id },
                data: data,
                include: {
                    sex: true,
                    race : {
                        include: {
                            specie : true,
                        }
                    }
                }
            });

            const transformedPet = {
                ...pet,
                birthDate: pet.birthDate.toString(), // Convertir BigInt en string
            }

            return transformedPet;
        } catch (error) {
            console.error("Erreur lors de la modification du pet", error);
            throw error;
        }
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- CREATE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    async addPet(data) {
        try {
            const pet = await prisma.pet.create({
                data: data,
                include: {
                    sex: true,
                    race : {
                        include: {
                            specie : true,
                        }
                    }
                }
            });

            const transformedPet = {
                ...pet,
                birthDate: pet.birthDate.toString(), // Convertir BigInt en string
            }

            return transformedPet;
        } catch (error) {
            console.error("Erreur lors de la création du pet", error);
            throw error;
        }
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- DELETE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    async deletePetById(petId) {
        try {
            await prisma.pet.delete({
                where : {
                    id: petId,
                }
            });
        } catch (error) {
            console.error("Erreur lors de la suppression du pet", error);
            throw error;
        }
    }
}

module.exports = new PetRepository();