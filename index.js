const express = require('express');
const app = express();

const products = require('./products.json');

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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
