const Sequelize = require("sequelize")
const database = require("./db")
const Internos = database.define("Products", 
{
    idInterno: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nomeInterno:
    {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    cpfInterno:
    {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    idadeInterno: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: 
    {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt:
    {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = Internos