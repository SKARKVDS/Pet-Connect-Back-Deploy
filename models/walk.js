/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Walk = sequelize.define('Walk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }/!*,
    RequestId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'PetWalkerRequests',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*!/
}, {
    timestamps: false,
});

module.exports = Walk;*/
