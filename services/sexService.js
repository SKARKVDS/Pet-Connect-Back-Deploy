const sexRepository = require("../repositories/sexRepository");

exports.getAllSexes = async () => {
    return await sexRepository.getAllSexes();
};