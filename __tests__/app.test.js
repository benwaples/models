const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Fruit = require('../lib/models/fruits');

describe('demo routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('creates a new Fruit via POST ', async() => {
    const response = await request(app)
      .post('/api/fruits')
      .send({ name: 'apple', color: 'red', size: 'medium' });

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'apple',
      color: 'red',
      size: 'medium'
    });
  });

  it('gets a fruit by id via GET', async() => {
    const createdFruit = await Fruit.insert({ 
      name: 'apple', 
      color: 'red', 
      size: 'medium' });

    const response = await request(app)
      .get(`/api/fruits/${createdFruit.id}`);

    expect(response.body).toEqual({
      id: createdFruit.id,
      name: 'apple', 
      color: 'red', 
      size: 'medium' 
    });
  });
  
});
