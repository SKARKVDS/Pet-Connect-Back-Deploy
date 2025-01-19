/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OwnerWalkProposal = sequelize.define('OwnerWalkProposal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    desiredStartTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    desiredEndTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departureLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    arrivalLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    }/!*,
    PetId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pets',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*!/
}, {
    timestamps: false,
});

module.exports = OwnerWalkProposal;*/
