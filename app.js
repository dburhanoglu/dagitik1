const express = require('express')
const app = express()
const port = 3000

const { connectToDB } = require('./db')
const { addProducts } = require('./products')

app.use(express.static('public'))

connectToDB()
  .then(() => {
    addProducts()
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
