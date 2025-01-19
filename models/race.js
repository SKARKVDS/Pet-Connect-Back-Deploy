/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Race = sequelize.define('Race', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }/!*,
    SpecieId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Species',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }*!/
}, {
    timestamps: false,
});

module.exports = Race;*/
