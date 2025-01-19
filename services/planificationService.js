const planificationRepository = require('../repositories/planificationRepository');


exports.getAllPlanificationsByProposalId = async (proposalId) => {
    const dateTime = new Date().getTime()

    const planifications = await planificationRepository.getAllPlanificationsByProposalId(proposalId, dateTime);

    const formattedPlanifications = planifications.map(planification => ({
        dateTime: parseInt(planification.dateTime),
        requestCount: planification.requests.length,
    }))

    return formattedPlanifications;
};


exports.getPlanificationByProposalIdAndTimestamp = async (proposalId, timestamp) => {
    const planifications = await planificationRepository.getPlanificationByProposalIdAndTimestamp(proposalId, timestamp);

    return planifications[0];
};

exports.addPlanifications = async (data) => {
    const today = new Date().getTime();
    const futurePlanifications = await planificationRepository.getAllFuturePlanificationsByProposalId(data.proposalId,today)

    const newSet = [...new Set(data.dateTimes.map(item => Number(item.dateTime)))];
    const oldSet = [...new Set(futurePlanifications.map(item =>  Number(item.dateTime)))];


    const uniqueNew = newSet.filter(dateTime => !oldSet.includes(dateTime));

// Récupérer les `dateTime` présents uniquement dans liste2
    const uniqueOld = oldSet.filter(dateTime => !newSet.includes(dateTime));

    for(let dateTime of uniqueNew) {
        await planificationRepository.addPlanification({
            dateTime: dateTime,
            proposalId: data.proposalId,
        });
    }

    for(let dateTime of uniqueOld) {
        await planificationRepository.deletePlanification({
            dateTime: dateTime,
            proposalId: data.proposalId,
        });
    }


};


exports.clearExpiredPlanifications = async (dateTimeToday) => {
    await planificationRepository.clearExpiredPlanifications(dateTimeToday)
};



