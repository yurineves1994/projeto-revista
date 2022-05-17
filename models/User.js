const {
    DataTypes
} = require('sequelize')

const db = require('../db/conm')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    occupation: {
        type: DataTypes.STRING,
        required: true,
    },
    newletter: {
        type: DataTypes.BOOLEAN,
        required: false,
    }
})

module.exports = User