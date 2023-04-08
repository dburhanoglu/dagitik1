const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const { addProducts } = require('./routes/products');

const port = 3000;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/dagitik.d', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to database');

    // Ürünleri veritabanına ekle
    addProducts();
  })
  .catch(err => console.log('Connection error:', err));

app.get('/search', (req, res) => {
  // Alınan sorguyu kontrol edin
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
    const response = {
      products: products,
      date: new Date()
    };
    res.json(response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
