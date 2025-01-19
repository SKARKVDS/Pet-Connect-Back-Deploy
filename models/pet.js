/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }/!*,
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    RaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Races',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }*!/
}, {
    timestamps: false,
    tableName: 'Pets'
});

module.exports = Pet;*/
