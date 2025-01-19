const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Certify = sequelize.define('Certify', {
   /* UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    BadgeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Badges',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },*/

}, { timestamps: false });

module.exports = Certify;