const fs = require('fs');
const pool = require('../utils/pool');
const Beer = require('./beer');

describe('Beer class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should add a new beer to the database', async() => {
    const contactHaze = await Beer.insert({
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });

    const { rows } = await pool.query('SELECT * FROM beers WHERE id=$1', [contactHaze.id]);

    expect(rows[0]).toEqual({
      id: contactHaze.id,
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });
  });

  it('should find a beer by id', async() => {
    const contactHaze = await Beer.insert({
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });

    const foundBeer = await Beer.findById(contactHaze.id);

    expect(foundBeer).toEqual({
      id: contactHaze.id,
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });
  });
});
