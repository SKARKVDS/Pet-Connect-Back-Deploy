const userRepository = require('../repositories/userRepository');
const reservationRepository = require("../repositories/reservationRepository");
const badgeService = require("../services/badgeService");
const defaultImageBadge = process.env.DEFAULT_IMAGE_BADGE;
const defaultImageUser = process.env.DEFAULT_IMAGE_USER;
const AdminId = process.env.AdminId;

exports.checkUserExistById = async (userId) => {
    return await userRepository.checkUserExistById(userId);
};

exports.getAllUsers = async () => {
    const users = await userRepository.getAllUsers();

    const formattedUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        url: user.url,
        countService: user.countService,
        countPet : user.pets.length,
        countProposal : user.proposals.length,
    }))

    return formattedUsers;
};

exports.createUser = async (data) => {
    return await userRepository.addUser(data);
};

exports.getUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);

    const formattedUser = {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        password: "",
        url: user.url ?? defaultImageUser,
        badgeUrl: user.badge?.url ?? defaultImageBadge,
        isAdmin: Number(user.roleId) === Number(AdminId),
    }

    return formattedUser;
};


exports.getUserRoleById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    return {id: user.id, role: user.roleId};
};

exports.getUserByEmail = async (email) => {
    return await userRepository.getUserByEmail(email);
};

exports.getUserByUserName = async (userName) => {
    return await userRepository.getUserByUserName(userName);
};

exports.getUserByPhoneNumber = async (phoneNumber) => {
    return await userRepository.getUserByPhoneNumber(phoneNumber);
};

exports.updateUserAdmin = async (data) => {
    let user = await userRepository.updateUserAdmin(data);

    const badge = await badgeService.getBadgeLowerX(user.countService)

    if(badge){
        if(user.badgeId !== badge.id){
            user = await userRepository.updateUserAdmin({id: user.id, badgeId: badge.id})
        }
    }

    const formattedUser = {
        id: user.id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        url: user.url,
        countService: user.countService,
        countPet : user.pets.length,
        countProposal : user.proposals.length,
    }



    return formattedUser;
};

exports.updateUser = async (data) => {
    const user = await userRepository.updateUser(data);

    const formattedUser = {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        password: "",
        url: user.url ?? defaultImageUser,
        badgeUrl: user.badge?.url ?? defaultImageBadge,
    }

    return formattedUser;
};

exports.deleteUser = async (userId) => {
    return await userRepository.deleteUser(userId);
};

exports.deleteUserImage = async (userId) => {
    const user = await userRepository.deleteUserImage(userId);

    const formattedUser = {
        id: user.id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        url: user.url,
        countService: user.countService,
        countPet : user.pets.length,
        countProposal : user.proposals.length,
    }

    return formattedUser;
};


exports.incrementServiceById = async (userId) => {
    let user = await userRepository.incrementServiceById(userId)
    const badge = await badgeService.getBadgeLowerX(user.countService)

    if(badge){
        if(user.badgeId !== badge.id){
           user = await userRepository.updateUser({id: user.id, badgeId: badge.id})
        }
    }

    return user;
};
