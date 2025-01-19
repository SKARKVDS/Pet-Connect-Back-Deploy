const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class ReservationRepository {
    async checkReservationRequestAccessibleByIdAndUserId(reservationId, userId) {
        try {
            const reservation = await prisma.reservation.findUnique({
                where: {
                    id: reservationId,
                    request: {
                        pets: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return !!reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async checkReservationProposalAccessibleByIdAndUserId(reservationId,userId) {
        try {
            const reservation = await prisma.reservation.findUnique({
                where: {
                    id: reservationId,
                    request: {
                        planification: {
                            proposal: {
                                userId: userId,
                            }
                        }
                    },
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return !!reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async getAllReservationsRequestByUserId(userId) {
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    request: {
                        pets: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservations;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async getAllReservationsProposalByUserId(userId) {
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    request: {
                        planification: {
                            proposal: {
                                userId: userId,
                            }
                        }
                    },
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservations;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }


    async getAllReservationsMemoryRequestByUserId(userId) {
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    request: {
                        pets: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                    isFinish : true
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservations;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async getAllReservationsMemoryProposalByUserId(userId) {
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    request: {
                        planification: {
                            proposal: {
                                userId: userId,
                            }
                        }
                    },
                    isFinish : true
                },
                include: {
                    request: {
                        include: {
                            pets: true,
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservations;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }


    async getReservationRequestById(reservationId) {
        try {
            const reservation = await prisma.reservation.findUnique({
                where: {
                    id: reservationId,
                },
                include: {
                    request: {
                        include: {
                            address: true,
                            pets: {
                                include: {
                                    race: {
                                        include: {
                                            specie: true
                                        }
                                    }
                                }
                            },
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            address: true,
                                            user: true,
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async getReservationProposalById(reservationId) {
        try {
            const reservation = await prisma.reservation.findUnique({
                where: {
                    id: reservationId,
                },
                include: {
                    request: {
                        include: {
                            address: true,
                            pets: {
                                include: {
                                    user: true,
                                    race: {
                                        include: {
                                            specie: true
                                        }
                                    }
                                }
                            },
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            address: true,
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async finishReservation(data) {
        try {
            const reservation = await prisma.reservation.update({
                where: {
                    id: data.id,
                },
                data: data,
                include: {
                    request: {
                        include: {
                            address: true,
                            pets: {
                                include: {
                                    race: {
                                        include: {
                                            specie: true
                                        }
                                    }
                                }
                            },
                            planification: {
                                include: {
                                    proposal: {
                                        include: {
                                            address: true,
                                            user: true,
                                            type : true
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            });


            return reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }

    async addReservation(data) {
        try {
            const reservation = await prisma.reservation.create({
                data: data,
            });

            return reservation;
        } catch (error) {
            console.error('Erreur lors de la récupération des sexes', error);
            throw error;
        }
    }
}

module.exports = new ReservationRepository();