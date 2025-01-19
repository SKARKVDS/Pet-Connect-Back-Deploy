const proposalRepository = require('../repositories/proposalRepository');
const {exports: proposals} = require("mssql/lib/base");


exports.checkProposalAccessibleByIdAndUserId = async (proposalId, userId) => {
    return await proposalRepository.checkProposalAccessibleByIdAndUserId(proposalId, userId);
};

exports.getAllProposalsByUserIdAdmin = async (userId) => {
    const proposals = await proposalRepository.getAllProposalsByUserIdAdmin(userId)

    const formattedProposals = proposals.map(proposal => ({
        id: proposal.id,
        description: proposal.description,
        typeName: proposal.type.name,
        address: proposal.address
            ? `${proposal.address.number} ${proposal.address.street}, ${proposal.address.city}, ${proposal.address.country}`
            : '------',
        speciesName: proposal.species.map(specie => (
            specie.name
        )),
        countPlanification: proposal._count.planifications,
        isDisable: proposal.isDisable,
    }))

    return formattedProposals;
};

exports.getAllProposalsByUserId = async (userId) => {
    const proposals = await proposalRepository.getAllProposalsByUserId(userId)

    const formattedProposals = proposals.map(proposal => ({
        id: proposal.id,
        description: proposal.description,
        typeName: proposal.type.name,
        address: proposal.address
            ? `${proposal.address.number} ${proposal.address.street}, ${proposal.address.city}, ${proposal.address.country}`
            : '------',
        species: proposal.species.map(specie => (
           specie.name
        )),
    }))

    return formattedProposals;
};

exports.getAllProposalsByTimestamp = async (timestamp, userId) => {
    const proposals = await proposalRepository.getAllProposalsByTimestamp(timestamp, userId)

    const formattedProposals = proposals.map(proposal => ({
        id: proposal.id,
        url: proposal.user.url,
        userName: proposal.user.userName,
        firstName: proposal.user.firstName,
        lastName: proposal.user.lastName,
        phoneNumber: proposal.user.phoneNumber,
        email: proposal.user.email,
        badgeName: proposal.user.badge
            ? `${proposal.user.badge.name}`
            : '------',
        description: proposal.description,
        typeId: proposal.type.id,
        typeName: proposal.type.name,
        address: proposal.address
            ? `${proposal.address.number} ${proposal.address.street}, ${proposal.address.city}, ${proposal.address.country}`
            : '------',
        species: proposal.species.map(specie => (
            specie.name
        )),
    }))

    return formattedProposals;
};

exports.updateProposalAdmin = async (proposalData) => {
    const proposal = await proposalRepository.updateProposalAdmin(proposalData);

    const formattedProposal = {
        id: proposal.id,
        description: proposal.description,
        typeName: proposal.type.name,
        address: proposal.address
            ? `${proposal.address.number} ${proposal.address.street}, ${proposal.address.postalCode} ${proposal.address.city}, ${proposal.address.country}`
            : '------',
        speciesName: proposal.species.map(specie => (
            specie.name
        )),
        countPlanification: proposal._count.planifications,
        isDisable: proposal.isDisable,
    }

    return formattedProposal
};


exports.updateProposal = async (data) => {
    const proposal = await proposalRepository.updateProposal(data)

    return {
        id: proposal.id,
        description: proposal.description,
        typeName: proposal.type.name,
        address: proposal.address
            ? `${proposal.address.number} ${proposal.address.street}, ${proposal.address.city}, ${proposal.address.country}`
            : '------',
        species: proposal.species.map(specie => (
            specie.name
        )),
    }
};

exports.addProposal = async (proposalData) => {
    return await proposalRepository.addProposal(proposalData);
};

exports.deleteProposalById = async (proposalId) => {
    return await proposalRepository.deleteProposalById(proposalId);
};