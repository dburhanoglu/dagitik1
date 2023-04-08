const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');
const Product = require('./models/Product');

const port = 3000;

// MongoDB bağlantısı
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => console.log('Connection error:', err));

app.get('/search', (req, res) => {
  const query = req.query.q;

  // MongoDB'den ürünlerin filtrelenmesi
  Product.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { price: { $regex: query, $options: 'i' } },
      { stock: { $regex: query, $options: 'i' } }
    ]
  }, (err, products) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occurred');
    }

    // filtrelenen ürünlerin istemciye gönderilmesi
    res.json(products);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
