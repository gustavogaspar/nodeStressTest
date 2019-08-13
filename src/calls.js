const oracledb = require('oracledb')
const faker = require('faker')
const dbconnect = require('./dbconnect.js')


oracledb.autoCommit=true

async function stressInsert()
{
  console.log("Iniciando conexão com o Autonomous Database...")
  const connection = await oracledb.getConnection(dbconnect)
  console.log("Iniciando modulo de SODA...")
  const soda = await connection.getSodaDatabase()
  console.log("Criando collection JSON...")
  const collection = await soda.createCollection('usercollection')
  const firstInput = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }
  console.log("Inserindo registro no banco: ",firstInput)
  document = await collection.insertOneAndGet(firstInput);
  await connection.close();
  return "A conexão com o banco foi estabelecida, e o registro: "+document.key+" foi criado com sucesso"
}

async function getAll(){
  let content
  console.log("Iniciando conexão com o Autonomous Database...")
  const connection = await oracledb.getConnection(dbconnect)
  console.log("Iniciando modulo de SODA...")
  const soda = await connection.getSodaDatabase()
  const collection = await soda.createCollection('usercollection')
  const documents = await collection.find().getDocuments()
  console.log(documents)
  for (let i = 0; i < documents.length; i++) {
    content += await documents[i].getContentAsString();
  }
  await connection.close
  return content
}

module.exports = { stressInsert, getAll }