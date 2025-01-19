const vaccineRepository = require("../repositories/vaccineRepository");

exports.getAllVaccines = async () => {
    return await vaccineRepository.getAllVaccines();
};

exports.getVaccineById = async (vaccineId) => {
    return await vaccineRepository.getVaccineById(vaccineId);
};

exports.updateVaccine = async (data) => {
    return await vaccineRepository.updateVaccine(data);
};

exports.addVaccine = async (data) => {
    return await vaccineRepository.addVaccine(data);
};

exports.deleteVaccineById = async (vaccineId) => {
    return await vaccineRepository.deleteVaccineById(vaccineId);
};