const specieRepository = require('../repositories/specieRepository');

exports.checkSpecieExistById = async (specieId) => {
    return await specieRepository.checkSpecieExistById(specieId);
};

exports.getAllSpecies = async () => {
    return await specieRepository.getAllSpecies();
};

exports.getAllSpeciesWithRaceCounts = async () => {
    const species = await specieRepository.getAllSpeciesWithRaceCounts()

    const formattedSpecies = species.map(specie => ({
        id : specie.id,
        name: specie.name,
        countRaces: specie._count.races,
    }))

    return formattedSpecies;
};

exports.getAllSpeciesByTypeId = async () => {
    return await specieRepository.getAllSpeciesByTypeId();
};

exports.updateSpecie = async (data) => {
    const specie =  await specieRepository.updateSpecie(data);

    const formattedSpecie = {
        id : specie.id,
        name: specie.name,
        countRaces: specie._count.races,
    }

    return formattedSpecie;
};

exports.addSpecie = async (data) => {
    const specie =  await specieRepository.addSpecie(data);

    const formattedSpecie = {
        id : specie.id,
        name: specie.name,
        countRaces: 0,
    }

    return formattedSpecie;
};

exports.deleteSpecieById = async (specieId) => {
    return await specieRepository.deleteSpecieById(specieId);
};