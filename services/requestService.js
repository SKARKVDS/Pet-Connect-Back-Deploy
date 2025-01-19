const requestRepository = require('../repositories/requestRepository');
const reservationRepository = require('../repositories/reservationRepository');

exports.getAllRequestsSendByUserId = async (userId) => {
    const requests = await requestRepository.getAllRequestsSendByUserId(userId);

    const formattedRequests = requests.map(request => ({
        id: request.id,
        startTime: Number(request.startTime),
        endTime: Number(request.endTime),
        userName: request.planification.proposal.user.userName,
        typeName: request.planification.proposal.type.name,
        address: request.address
            ? `Address specify by receiver`
            : `Address specify by sender`,
        pets: request.pets.map(pet => (
            pet.nickName
        )),
        isAccepted: request.isAccepted,
    }))

    return formattedRequests;
};

exports.getAllRequestsReceiveByUserId = async (userId) => {
    const requests = await requestRepository.getAllRequestsReceiveByUserId(userId);

    const formattedRequests = requests.map(request => ({
        id: request.id,
        startTime: Number(request.startTime),
        endTime: Number(request.endTime),
        userName: request.pets[0].user.userName,
        typeName: request.planification.proposal.type.name,
        address: request.address
            ? `Address specify by receiver`
            : `Address specify by sender`,
        pets: request.pets.map(pet => `${pet.nickName} - ${pet.race.name} - ${pet.race.specie.name}`)
    }))

    return formattedRequests;
};


exports.acceptRequest = async (data) => {
    const request = await requestRepository.acceptRequest(data);

    await reservationRepository.addReservation({isFinish: false, requestId: request.id});

    return true
};

exports.acceptNoMoreRequest = async (data) => {
    const request = await requestRepository.acceptNoMoreRequest(data);

    await reservationRepository.addReservation({isFinish: false, requestId: request.id});

    return true
};

exports.addRequest = async (data) => {
    return requestRepository.addRequest(data);
};

exports.deleteRequestById = async (requestId) => {
    return await requestRepository.deleteRequestById(requestId);
};