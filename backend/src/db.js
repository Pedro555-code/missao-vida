const Sequelize = require("sequelize")
const config = require("../config/database")
const data = new Sequelize(config)

module.exports = data