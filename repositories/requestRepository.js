const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class RequestRepository {
    async getAllRequestsSendByUserId(userId) {
        try {
            const requests = await prisma.request.findMany({
                where: {
                    pets: {
                        some: {
                            userId: userId,
                        },
                    },
                },
                include: {
                    address:true,
                    pets: true,
                    planification: {
                        include: {
                            proposal: {
                                include: {
                                    address: true,
                                    user: true,
                                    type: true
                                }
                            }
                        },
                    }
                },
            })

            const transformedRequests = requests.map(request => ({
                ...request,
                startTime: Number(request.startTime),  // Convertir BigInt en string
                endTime: Number(request.endTime),    // Convertir BigInt en string
            }))

            return transformedRequests;
        } catch (error) {
            console.error('Erreur lors de la récupération des requests envoyées', error);
            throw error;
        }
    }


    async getAllRequestsReceiveByUserId(userId) {
        try {
            const requests = await prisma.request.findMany({
                where: {
                    planification: {
                        proposal: {
                            userId: userId,
                        },
                    },
                    isAccepted: false,
                },
                include: {
                    address:true,
                    pets: {
                        include: {
                            user: true,
                            race: {
                                include: {
                                    specie: true,
                                }
                            }
                        }
                    },
                    planification: {
                        include: {
                            proposal: {
                                include: {
                                    address: true,
                                    type: true
                                }
                            }
                        },
                    }
                },
            })

            const transformedRequests = requests.map(request => ({
                ...request,
                startTime: Number(request.startTime),  // Convertir BigInt en string
                endTime: Number(request.endTime),    // Convertir BigInt en string
            }))

            return transformedRequests;
        } catch (error) {
            console.error('Erreur lors de la récupération des requests reçu', error);
            throw error;
        }
    }


    async acceptRequest(data) {
        try {
            const request = await prisma.request.update({
                where: {
                    id: data.id
                },
                data:{
                    isAccepted: true,
                }
            })

            return request;
        } catch (error) {
            console.error('Erreur lors de la modification de la request', error);
            throw error;
        }
    }

    async acceptNoMoreRequest(data) {
        try {
            const request = await prisma.request.update({
                where: {
                    id: data.id
                },
                data:{
                    isAccepted: true,
                    planification:{
                        update: {
                            isDisplay: false, // Mettre à jour le champ isDisplay de la planification associée
                        },
                    }
                },
                include: {
                    planification: true, // Inclure les détails de la planification dans la réponse
                },
            })

            return request;
        } catch (error) {
            console.error('Erreur lors de la modification de la request', error);
            throw error;
        }
    }


    async addRequest(data) {
        try {
            const request = await prisma.request.create({
                data: {
                    planificationId: data.planificationId,
                    isAccepted: false,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    addressId: data.addressId,
                    pets: {
                        connect: data.pets.map(petId => ({ id: petId.id })) // Assuming `data.pets` is an array of pet IDs.
                    }
                }
            })

            return request;
        } catch (error) {
            console.error('Erreur lors de l ajout de la request', error);
            throw error;
        }
    }

    async deleteRequestById(requestId) {
        try {
            const request = await prisma.request.delete({
                where: {
                    id: requestId
                },
            })

            return request;
        } catch (error) {
            console.error('Erreur lors de la suppression de la request', error);
            throw error;
        }
    }
}

module.exports = new RequestRepository();