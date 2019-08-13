const express = require('express') //importacao do pacote
const app = express() //instanciando express
const cors = require('cors')
const calls = require('./calls')

app.use(cors())

app.get('/stress/', async function (req, res) {
    res.send(await calls.stressInsert())
})

app.get('/getall/', async function (req, res){
    res.send(await calls.getAll())
})

app.listen(process.env.PORT || 3000, () => {
    console.info(`service online\n`);
   });