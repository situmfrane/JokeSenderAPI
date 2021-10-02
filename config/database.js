const { Sequelize } = require('sequelize');
require('dotenv').config();

//Sequelize ORM database connection
const sequelize = new Sequelize(process.env.DATABASE, 'root', process.env.DB_PASS, 
    {
        dialect: 'mysql',
        host: process.env.HOST,
    }
)

module.exports = sequelize;