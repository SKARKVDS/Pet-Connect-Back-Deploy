/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PetWalkerRequest = sequelize.define('PetWalkerRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }/!*,
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: true,
    },
    ProposalId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'OwnerWalkProposals',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*!/
}, {
    timestamps: false,
});

module.exports = PetWalkerRequest;*/
