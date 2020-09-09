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
});
