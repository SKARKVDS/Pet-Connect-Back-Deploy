/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Photo = sequelize.define('Photo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    base64: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }/!*,
    WalkId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Walks',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*!/
}, {
    timestamps: false,
});

module.exports = Photo;*/
