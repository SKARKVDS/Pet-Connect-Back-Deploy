const reservationRepository = require("../repositories/reservationRepository");
const userService = require("../services/userService");

exports.checkReservationRequestAccessibleByIdAndUserId = async (reservationId, userId) => {
    return await reservationRepository.checkReservationRequestAccessibleByIdAndUserId(reservationId, userId);
};

exports.checkReservationProposalAccessibleByIdAndUserId = async (reservationId, userId) => {
    return await reservationRepository.checkReservationProposalAccessibleByIdAndUserId(reservationId, userId);
};

exports.getAllReservationsRequestByUserId = async (userId) => {
    const reservations = await reservationRepository.getAllReservationsRequestByUserId(userId);

    const formattedReservations = reservations.map(reservation => ({
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
    }))

    return formattedReservations;
};

exports.getAllReservationsProposalByUserId = async (userId) => {
    const reservations = await reservationRepository.getAllReservationsProposalByUserId(userId);

    const formattedReservations = reservations.map(reservation => ({
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
    }))

    return formattedReservations;
};

exports.getAllReservationsMemoryRequestByUserId = async (userId) => {
    const reservations = await reservationRepository.getAllReservationsMemoryRequestByUserId(userId);

    const formattedReservations = reservations.map(reservation => ({
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
    }))

    return formattedReservations;
};

exports.getAllReservationsMemoryProposalByUserId = async (userId) => {
    const reservations = await reservationRepository.getAllReservationsMemoryProposalByUserId(userId);

    const formattedReservations = reservations.map(reservation => ({
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
    }))

    return formattedReservations;
};

exports.getReservationRequestById = async (reservationId) => {
    const reservation = await reservationRepository.getReservationRequestById(reservationId);
    const now = new Date().getTime();

    const formattedReservation = {
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
        userName: reservation.request.planification.proposal.user.userName,
        phoneNumber: reservation.request.planification.proposal.user.phoneNumber,
        email: reservation.request.planification.proposal.user.email,
        address: reservation.request.address
            ? `${reservation.request.address.number} ${reservation.request.address.street}, ${reservation.request.address.city}, ${reservation.request.address.country}`
            : `${reservation.request.planification.proposal.address.number} ${reservation.request.planification.proposal.address.street}, ${reservation.request.planification.proposal.address.city}, ${reservation.request.planification.proposal.address.country}`,
        pets: reservation.request.pets.map(pet => `${pet.nickName} - ${pet.race.name} - ${pet.race.specie.name}`),
        isFinish: reservation.isFinish,
        canTouch: Number(reservation.request.endTime) < now
    }

    return formattedReservation;
};

exports.getReservationProposalById = async (reservationId) => {
    const reservation = await reservationRepository.getReservationProposalById(reservationId);
    const now = new Date().getTime();

    const formattedReservation = {
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
        userName: reservation.request.pets[0].user.userName,
        phoneNumber: reservation.request.pets[0].user.phoneNumber,
        email: reservation.request.pets[0].user.email,
        address: reservation.request.address
            ? `${reservation.request.address.number} ${reservation.request.address.street}, ${reservation.request.address.city}, ${reservation.request.address.country}`
            : `${reservation.request.planification.proposal.address.number} ${reservation.request.planification.proposal.address.street}, ${reservation.request.planification.proposal.address.city}, ${reservation.request.planification.proposal.address.country}`,
        pets: reservation.request.pets.map(pet => `${pet.nickName} - ${pet.race.name} - ${pet.race.specie.name}`),
    }

    return formattedReservation;
};

exports.finishReservation = async (data) => {
    const reservation = await reservationRepository.finishReservation(data);
    await userService.incrementServiceById(reservation.request.planification.proposal.user.id)

    const formattedReservation = {
        id: reservation.id,
        startTime: Number(reservation.request.startTime),
        endTime: Number(reservation.request.endTime),
        typeName: reservation.request.planification.proposal.type.name,
        userName: reservation.request.planification.proposal.user.userName,
        phoneNumber: reservation.request.planification.proposal.user.phoneNumber,
        email: reservation.request.planification.proposal.user.email,
        address: reservation.request.address
            ? `${reservation.request.address.number} ${reservation.request.address.street}, ${reservation.request.address.city}, ${reservation.request.address.country}`
            : `${reservation.request.planification.proposal.address.number} ${reservation.request.planification.proposal.address.street}, ${reservation.request.planification.proposal.address.city}, ${reservation.request.planification.proposal.address.country}`,
        pets: reservation.request.pets.map(pet => `${pet.nickName} - ${pet.race.name} - ${pet.race.specie.name}`),
        isFinish: reservation.isFinish,
        canTouch: false
    }

    return formattedReservation;
};