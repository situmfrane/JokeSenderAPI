const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//Model for user database table
const User = sequelize.define('users', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true //Unique field
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})


module.exports = User;