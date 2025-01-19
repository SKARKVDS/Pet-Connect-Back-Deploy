const vaccinationRepository = require("../repositories/vaccinationRepository");

exports.getAllFutureVaccinationsByUserId = async (petId) => {
    const vaccinations = await vaccinationRepository.getAllFutureVaccinationsByUserId(petId);

    const formattedVaccinations = vaccinations.map(vaccination => ({
        id: vaccination.id,
        vaccineName: vaccination.vaccine.name,
        petName: vaccination.pet.nickName,
        petId: vaccination.petId,
        dateBooster: vaccination.dateBooster.toString(),
    }))

    return formattedVaccinations;
};

exports.getAllVaccinationsByPetId = async (petId) => {
    const vaccinations = await vaccinationRepository.getAllVaccinationsByPetId(petId);

    const formattedVaccinations = vaccinations.map(vaccination => ({
        id: vaccination.id,
        vaccineName: vaccination.vaccine.name,
        vaccineId: vaccination.vaccine.id,
        petId: vaccination.petId,
        dateVaccination: vaccination.dateVaccination.toString(),
        dateBooster: vaccination.dateBooster.toString(),
        needBooster: vaccination.vaccine.needBooster
    }))

    return formattedVaccinations;
};

exports.updateVaccination = async (data) => {
    const vaccination = await vaccinationRepository.updateVaccination(data);

    const formattedVaccination = {
        id: vaccination.id,
        vaccineName: vaccination.vaccine.name,
        dateVaccination: vaccination.dateVaccination.toString(),
        dateBooster: vaccination.dateBooster.toString(),
        needBooster: vaccination.vaccine.needBooster
    }

    return formattedVaccination
};

exports.addVaccination = async (data) => {
    const vaccination = await vaccinationRepository.addVaccination(data);

    const formattedVaccination = {
        id: vaccination.id,
        vaccineName: vaccination.vaccine.name,
        dateVaccination: vaccination.dateVaccination.toString(),
        dateBooster: vaccination.dateBooster.toString(),
        needBooster: vaccination.vaccine.needBooster
    }

    return formattedVaccination
};

exports.deleteVaccinationById = async (vaccinationId) => {
    return await vaccinationRepository.deleteVaccinationById(vaccinationId);
};