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

});
