const raceRepository = require('../repositories/raceRepository');

exports.getAllRacesBySpecieId = async (specieId) => {
    return await raceRepository.getAllRacesBySpecieId(specieId);
};

exports.updateRace = async (data) => {
    return await raceRepository.updateRace(data);
};

exports.addRace = async (data) => {
    return await raceRepository.addRace(data);
};

exports.deleteRaceById = async (raceId) => {
    return await raceRepository.deleteRaceById(raceId);
};
