const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
    }/*,
    WalkId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Walks',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*/
}, {
    timestamps: false,
});

module.exports = Rating;
