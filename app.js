const express = require('express');
const app = express();
const port = 3000;
const products = require('./products.json');

app.get('/search', (req, res) => {
  const query = req.query.q;

  // products.json dosyasındaki ürünlerin filtrelenmesi
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

  // filtrelenen ürünlerin istemciye gönderilmesi
  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
