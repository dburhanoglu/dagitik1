const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');

const port = 3000;
const products = require('./products.json');

// MongoDB bağlantısı
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.log('MongoDB bağlantı hatası:', err));

// Endpoint örneği
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
