const fs = require('fs');
const pool = require('../utils/pool');
const Oil = require('./essentialOils');

describe('Oil class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should add a new essential oil to the database', async() => {
    const lavender = await Oil.insert({
      name: 'lavender',
      color: 'purple',
      recommend: true
    });


    const { rows } = await pool.query('SELECT * FROM essential_oils WHERE id=$1', [lavender.id]);

    expect(rows[0]).toEqual({
      id: lavender.id,
      name: 'lavender',
      color: 'purple',
      recommend: true
    });
  });

  it('should find an oil by id', async() => {
    const lavender = await Oil.insert({
      name: 'lavender',
      color: 'purple',
      recommend: true
    });

    const foundLavender = await Oil.findById(lavender.id);

    expect(foundLavender).toEqual({
      id: lavender.id,
      name: 'lavender',
      color: 'purple',
      recommend: true
    });
  });

  it('should return all essential Oils in the database', async() => {
    await Promise.all([
      Oil.insert({
        name: 'lavender',
        color: 'purple',
        recommend: true
      }),
      Oil.insert({
        name: 'pine',
        color: 'green',
        recommend: true
      }),
      Oil.insert({
        name: 'Target brand lavender',
        color: 'purple',
        recommend: false
      })
    ]);

    const foundAllOils = await Oil.findAll();

    expect(foundAllOils).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'lavender', color: 'purple', recommend: true },
      { id: expect.any(String), name: 'pine', color: 'green', recommend: true },
      { id: expect.any(String), name: 'Target brand lavender', color: 'purple', recommend: false },
    ]));
  });

  it('should edit an essential oil from an id', async() => {
    const lavender = await Oil.insert({
      name: 'lavender',
      color: 'purple',
      recommend: true
    });

    const changedLavender = await Oil.edit(lavender.id, {
      name: 'CO-OP lavender',
      color: 'green',
      recommend: true
    });

    expect(changedLavender).toEqual({
      id: lavender.id,
      name: 'CO-OP lavender',
      color: 'green',
      recommend: true
    });
  });

  it('should delete an oil by id', async() => {
    const lavender = await Oil.insert({
      name: 'lavender',
      color: 'purple',
      recommend: true
    });

    const deletedOil = await Oil.delete(lavender.id);

    expect(deletedOil).toEqual({
      id: lavender.id,
      name: 'lavender',
      color: 'purple',
      recommend: true
    });
  });
  
});
