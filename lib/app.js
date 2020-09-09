const express = require('express');
const app = express();
const Fruit = require('./models/fruits');

app.use(express.json());

app.post('/api/fruits', async(req, res, next) => {
  try {
    const makeFruit = await Fruit.insert(req.body);
    res.send(makeFruit);
  } catch(e) {
    next(e);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
