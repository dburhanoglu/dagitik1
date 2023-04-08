const express = require('express');
const app = express();
const { connectToDB } = require('./db');
const { addProducts } = require('./products');

const port = 3000;

// Veritabanı bağlantısını yap
connectToDB()
  .then(() => {
    console.log('Connected to database');

    // Ürünleri veritabanına ekle
    addProducts();
  })
  .catch(err => console.log('Connection error:', err));

app.get('/search/:query', (req, res) => {
  // TODO: Alınan sorguyu kontrol edin
  const query = req.params.query;

  const matchedProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(query.toLowerCase()) ||
    product.stock.toString().toLowerCase().includes(query.toLowerCase())
  );

  // TODO: Eşleşen ürünlerin tam isimleri, fiyat bilgileri, stok durumları ve sorgulama işleminin yapıldığı tarih istemciye gönderin
  const response = {
    products: matchedProducts,
    date: new Date()
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
