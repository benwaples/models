const fs = require('fs');
const Vegetable = require('./vegetable');
const pool = require('../utils/pool');

describe('Vegetables model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('add a new vegetable to the database', async() => {
    const addVegetable = await Vegetable.insert({
      name: 'eggplant',
      color: 'green',
      size: 'medium'
    });

    const { rows } = await pool.query('SELECT * FROM vegetables WHERE id=$1', [addVegetable.id]);
    console.log(addVegetable);

    expect(rows[0]).toEqual(addVegetable);
  });

  it('should find a vegetable by id', async () => {
    const mushroom = await Vegetable.insert({
      name: 'mushroom',
      color: 'brown',
      size: 'small'
    });

    const foundMushroom = await Vegetable.findById(mushroom.id);

    expect(foundMushroom).toEqual({
      id: mushroom.id,
      name: 'mushroom',
      color: 'brown',
      size: 'small'
    });
  });

  it('should return all vegetables in the database', async() => {
    await Promise.all([
      Vegetable.insert({
        name: 'mushroom',
        color: 'brown',
        size: 'small'
      }),
      Vegetable.insert({
        name: 'potato',
        color: 'brown',
        size: 'medium'
      }),
      Vegetable.insert({
        name: 'beets',
        color: 'red',
        size: 'small'
      })
    ]);

    const allVeggie = await Vegetable.findAll();

    console.log(allVeggie);

    expect(allVeggie).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'mushroom', color: 'brown', size: 'small' },
      { id: expect.any(String), name: 'potato', color: 'brown', size: 'medium' },
      { id: expect.any(String), name: 'beets', color: 'red', size: 'small' }
    ]));

  });
});
