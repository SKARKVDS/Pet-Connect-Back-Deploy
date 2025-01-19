const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AddressRepository {
    async getAddressByAttributes(number, street, city, country) {
        try {
            const address = await  prisma.address.findMany({
                where: {
                    number: number,
                    street: street,
                    city: city,
                    country: country
                    },
                select: {
                    id: true,
                },
            });

            return address;
        }catch (error){
            console.error('Erreur lors de la récupération de l adresse',error);
            throw error;
        }
    }


    async addAddress(data) {
        try {
            const address = await prisma.address.create({
                data: data,
            });

            return address;
        }catch (error){
            console.error('Erreur lors de la création de l adresse',error);
            throw error;
        }
    }


    async clearUnusedAddresses() {
        try {
            const addresses = await prisma.address.deleteMany({
                where: {
                    Proposals: {
                        none: {}, // Filtre les adresses sans Proposals
                    },
                    Requests: {
                        none: {}, // Filtre les adresses sans Requests
                    },
                },
            });

            return addresses;
        }catch (error){
            console.error('Erreur lors de la suppression des adresses inutilisées',error);
            throw error;
        }
    }


}

module.exports = new AddressRepository();