const cld = require("../api/cloudinarySingleton");

class PhotoCloudinaryRepository {
    async addPhoto(file) {
        return new Promise((resolve, reject) => {
            cld.uploader.upload_stream(
                {
                    folder: "Pet-Connect-Images", // Dossier sur Cloudinary
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        console.error('Erreur Cloudinary :', error);
                        return reject(error);
                    }
                    resolve(result);
                }
            ).end(file.buffer); // Envoi du buffer du fichier
        });
    }

    async getPhotosFromFolder(folderName) {
        try {
            const result = await cld.api.resources({
                type: 'upload',
                prefix: "Pet-Connect-Images/" + folderName, // Spécifiez le dossier
                resource_type: 'image', // Limite les ressources aux images
            });

            /*return result.resources.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
            }));*/
            return result.resources.map(resource => {
                // Extraire uniquement le nom du fichier à partir du public_id
                const fileName = resource.public_id.split('/').pop(); // Récupère le dernier segment après "/"

                return {
                    fileName, // Nom du fichier
                    url: resource.secure_url, // URL complète de l'image
                };
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des photos depuis Cloudinary :', error);
            throw error;
        }
    }

    /*
    Méthode non obligatoire cela dépend de si on doit supprimer une photo ou non
     */
    async deletePhoto(publicId) {
        try {
            return await cld.uploader.destroy(publicId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la photo de Cloudinary :', error);
            throw error;
        }
    }

    async getPhotoInfo(publicId) {
        try {
            const result = await cld.api.resource(publicId);
            return {
                public_id: result.public_id,
                url: result.secure_url,
                created_at: result.created_at,
                bytes: result.bytes,
                format: result.format,
                width: result.width,
                height: result.height,
            };
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de la photo :', error);
            throw error;
        }
    }
}

module.exports = new PhotoCloudinaryRepository();