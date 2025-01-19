const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PhotoRepository {
    async getAllPhotosByReservationId(reservationId) {
        try {
            const photos = await prisma.photos.findMany({
                where:{
                    reservationId : reservationId
                }
            })

            return photos;
        } catch (error) {
            console.error('Erreur lors de la récupération des photos : ', error)
            throw error;
        }
    };


    async addPhoto(data) {
        try {
            const photo = await prisma.photos.create({
                data: data
            });
            return photo;
        } catch (error) {
            console.error('Erreur lors de la création de la photo',error)
            throw error;
        }
    };



    async deletePhotoById(photoId) {
        try {
            const deletedPhoto = await prisma.photos.delete({
                where: { id: photoId },
            });
            return deletedPhoto;
        } catch (error) {
            console.error('Erreur lors de la suppression de la photo', error)
            throw error;
        }
    };
}

module.exports = new PhotoRepository();