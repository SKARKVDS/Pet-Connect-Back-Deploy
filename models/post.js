/*
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }/!*,
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        allowNull: true,
    },
    TopicId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Topics',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }*!/
}, {
    timestamps: false,
});

module.exports = Post;
*/
