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

app.get('/api/fruits/:id', async(req, res, next) => {
  try {
    const getFruit = await Fruit.findById(req.params.id);
    res.send(getFruit);
  } catch(e) {
    next(e);
  }
});

app.get('/api/fruits', async(req, res, next) => {
  try {
    const getAllFruit = await Fruit.findAll();
    res.send(getAllFruit);
  } catch(e){
    next(e);
  }
});

app.put('/api/fruits/:id', async(req, res, next) => {
  try {
    const editedFruit = await Fruit.edit(req.params.id, req.body);

    res.send(editedFruit);
  } catch(e){
    next(e);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
