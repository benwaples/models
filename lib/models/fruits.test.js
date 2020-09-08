const fs = require('fs');
const pools = require('../utils/pool');
const Fruit = require('./fruits');
const pool = require('../utils/pool');

describe('Fruits class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should add a new fruit to the fruits table', async() => {
    const apple = await Fruit.insert({
      name: 'apple',
      color: 'red',
      size: 'medium'
    });

    const { rows } = await pool.query('SELECT * FROM fruits WHERE id=$1', [apple.id]);

    expect(rows[0]).toEqual({
      id: apple.id,
      name: 'apple',
      color: 'red',
      size: 'medium'
    });

  });  

  it('should find a fruit by Id', async() => {
    const apple = await Fruit.insert({
      name: 'apple',
      color: 'red',
      size: 'medium'
    });

    const orange = await Fruit.insert({
      name: 'orange',
      color: 'orange',
      size: 'medium'
    });

    const foundApple = await Fruit.findById(apple.id);

    expect(foundApple).toEqual({
      id: apple.id,
      name: 'apple',
      color: 'red',
      size: 'medium'
    });
  });
});
