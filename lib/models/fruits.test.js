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

  it('should return all fruits', async() => {
    await Promise.all([
      Fruit.insert({
        name: 'apple',
        color: 'red',
        size: 'medium'
      }),
      Fruit.insert({
        name: 'orange',
        color: 'orange',
        size: 'medium'
      }),
      Fruit.insert({
        name: 'strawberry',
        color: 'red',
        size: 'small'
      })
    ]);

    const allFruit = await Fruit.findAll();

    expect(allFruit).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'apple', color: 'red', size: 'medium' },
      { id: expect.any(String), name: 'orange', color: 'orange', size: 'medium' },
      { id: expect.any(String), name: 'strawberry', color: 'red', size: 'small' }
    ]));
  });
});
