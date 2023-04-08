const { connectToDB } = require('../db')

async function addProducts() {
  const client = await connectToDB()
  const collection = client.db('myapp').collection('products')

  const products = [
    { name: 'Deri Çanta', price: 100, stock: 10 },
    { name: 'Kanvas Çanta', price: 80, stock: 5 },
    { name: 'Sırt Çantası', price: 120, stock: 3 },
  ]

  collection.insertMany(products, (err, result) => {
    if (err) throw err
    console.log(`${result.insertedCount} products inserted`)
    client.close()
  })
}

module.exports = {
  addProducts,
}
