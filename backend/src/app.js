const database = require("./db")
const internos = require("./internos")
const { Op } = require("sequelize")
const express = require("express")
const data = require("./db")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

app.post("/interno", async (request, response) => {
    try {
        await database.sync()
        const {nomeInterno, cpfInterno, idadeInterno} = request.body
        await internos.create(
            {
                nomeInterno,
                cpfInterno,
                idadeInterno,
                createdAt: new Date("2023-12-01 10:20:00"),
                updatedAt: new Date()
            }
        )
        return response.status(201).send()
    } catch(error) {
        return response.status(400).json(error)
    }
})

app.get("/internos", async (request, response) => {
    try {
        await database.sync()
        const internoAll = await internos.findAll()
        return response.json(internoAll)
    } catch(error) {
        return response.status(400).json(error)
    }
})

app.delete("/interno/:id", async (request, response) => {
    try{
        await database.sync()
        const {id} = request.params
        await internos.destroy(
            {
                where:
                {
                    idInterno: id
                }
            }
        )
        return response.status(200).send()
    }
    catch(error){
        return response.status(400).json(error)
    }
})

app.put("/internos", async (request, response) => {
    try{
        await database.sync()
        const {idInterno, nomeInterno, cpfInterno, idadeInterno} = request.body
        await internos.update(
            {
                nomeInterno: nomeInterno,
                cpfInterno: cpfInterno,
                idadeInterno: idadeInterno
            },
            {
                where:
                {
                    idInterno: idInterno
                }
            })
        return response.status(200).send()
    }
    catch(error){
        return response.status(400).json(error)
    }
})

app.listen(3333)