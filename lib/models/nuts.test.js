const Nut = require('./nuts');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Nut class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should add a new nut to the database', async() => {
    const peanut = await Nut.insert({
      name: 'peanut',
      size: 'small',
      isGood: true
    });

    const { rows } = await pool.query(
      'SELECT * FROM nuts WHERE id=$1', [peanut.id]
    );

    expect(rows[0]).toEqual({
      id: peanut.id,
      name: 'peanut',
      size: 'small',
      is_good: true
    });
  });

  it('finds a nut by id', async() => {
    const peanut = await Nut.insert({
      name: 'peanut',
      size: 'small',
      isGood: true
    });

    const foundNut = await Nut.findById(peanut.id);

    expect(foundNut).toEqual({
      id: peanut.id,
      name: 'peanut',
      size: 'small',
      is_good: true
    });
  });

  it('finds all nuts from the database', async() => {
    await Promise.all([
      Nut.insert({
        name: 'peanut',
        size: 'small',
        isGood: true
      }),
      Nut.insert({
        name: 'cashew',
        size: 'medium',
        isGood: true
      }),
      Nut.insert({
        name: 'pine nut',
        size: 'small',
        isGood: true
      }),
    ]);

    const allNuts = await Nut.findAll();

    expect(allNuts).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'peanut', size: 'small', isGood: true },
      { id: expect.any(String), name: 'cashew', size: 'medium', isGood: true },
      { id: expect.any(String), name: 'pine nut', size: 'small', isGood: true },
    ]));

  });

});
