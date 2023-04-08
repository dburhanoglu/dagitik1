const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017/dagitik.d'

async function connectToDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    console.log('Connected to database')
    return client
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectToDB,
}
