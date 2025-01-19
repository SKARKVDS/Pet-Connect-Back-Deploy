const petRepository = require('../repositories/petRepository');

exports.checkPetAccessibleByIdAndUserId = async (petId, userId) => {
    return await petRepository.checkPetAccessibleByIdAndUserId(petId, userId);
};

exports.getAllPetsByUserId = async (userId) => {
    const pets = await petRepository.getAllPetsByUserId(userId)

    const formattedPets = pets.map(pet => ({
        id: pet.id,
        nickName: pet.nickName,
        birthDate: pet.birthDate,
        identification: pet.identification,
        race: pet.race.name,
        specie: pet.race.specie.name,
        sex: pet.sex.name,
        url: pet.url
    }))

    return formattedPets;
};


exports.getAllPetsByUserIdAdmin = async (userId) => {
    const pets = await petRepository.getAllPetsByUserIdAdmin(userId)

    const formattedPets = pets.map(pet => ({
        id: pet.id,
        nickName: pet.nickName,
        birthDate: pet.birthDate,
        identification: pet.identification,
        race: pet.race.name,
        specie: pet.race.specie.name,
        sex: pet.sex.name,
        url: pet.url,
        isDisable: pet.isDisable,
    }))

    return formattedPets;
};

exports.updatePet = async (petData) => {
    const pet = await petRepository.updatePet(petData);

    const formattedPet = {
        id: pet.id,
        nickName: pet.nickName,
        birthDate: pet.birthDate,
        identification: pet.identification,
        race: pet.race.name,
        specie: pet.race.specie.name,
        sex: pet.sex.name,
        url: pet.url
    }

    return formattedPet;
};


exports.updatePetAdmin = async (petData) => {
    const pet = await petRepository.updatePet(petData);

    const formattedPet = {
        id: pet.id,
        nickName: pet.nickName,
        birthDate: pet.birthDate,
        identification: pet.identification,
        race: pet.race.name,
        specie: pet.race.specie.name,
        sex: pet.sex.name,
        url: pet.url,
        isDisable: pet.isDisable,
    }

    return formattedPet;
};

exports.addPet = async (petData) => {
    const pet = await petRepository.addPet(petData);

    const formattedPet = {
        id: pet.id,
        nickName: pet.nickName,
        birthDate: pet.birthDate,
        identification: pet.identification,
        race: pet.race.name,
        specie: pet.race.specie.name,
        sex: pet.sex.name,
        url: pet.url
    }

    return formattedPet;
};

exports.deletePetById = async (petId) => {
    await petRepository.deletePetById(petId);
};



