const {
    Sequelize
} = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//try {
//  sequelize.authenticate()
//console.log('Conectamos com sucesso com o Sequelize!')
//} catch (error) {
//  console.log('não foi possivel conectar:', error)
//}

module.exports = sequelize;