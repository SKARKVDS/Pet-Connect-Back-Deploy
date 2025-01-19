/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {User, Forum} = require("./index");

const Topic = sequelize.define('Topic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lastDateUpdated: {
        type: DataTypes.DATE,
    }/!*,
    ForumId: {
        type: DataTypes.INTEGER,
        references: {
            model: Forum,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    }*!/
}, {
    timestamps: false,
});

module.exports = Topic;*/
