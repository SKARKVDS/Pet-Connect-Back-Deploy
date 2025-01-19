const typeRepository = require('../repositories/typeRepository');
const typeService = require("./typeService");

exports.getAllTypesAdmin = async () => {
    const types = await typeRepository.getAllTypes();

    const formattedTypes = types.map(type => ({
        id : type.id,
        name: type.name,
        addressProposal: type.addressProposal,
        speciesName: type.species.map(specie => (
            specie.name
        )),
        species: type.species.map(specie => (
            specie.id
        )),
    }))

    return formattedTypes;
};

exports.getAllTypes = async () => {
    return await typeRepository.getAllTypes();
};

exports.getTypeById = async (typeId) => {
    return await typeRepository.getTypeById(typeId);
};

exports.updateType = async (data) => {
    const type = await typeRepository.updateType(data);

    const formattedType = {
        id : type.id,
        name: type.name,
        addressProposal: type.addressProposal,
        speciesName: type.species.map(specie => (
            specie.name
        )),
        species: type.species.map(specie => (
            specie.id
        )),
    }

    return formattedType;
};

exports.addType = async (data) => {
    const type = await typeRepository.addType(data);

    const formattedType = {
        id : type.id,
        name: type.name,
        addressProposal: type.addressProposal,
        speciesName: type.species.map(specie => (
            specie.name
        )),
        species: type.species.map(specie => (
            specie.id
        )),
    }

    return formattedType;
};

exports.deleteTypeById = async (typeId) => {
    return await typeRepository.deleteTypeById(typeId);
};
