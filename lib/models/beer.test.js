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

  it('should find all beers', async() => {
    await Promise.all([
      Beer.insert({
        name: 'contact haze',
        type: 'ipa',
        turnt_scale: 10
      }),
      Beer.insert({
        name: 'Stemma Kolsh',
        type: 'kolsh',
        turnt_scale: 8
      }),
      Beer.insert({
        name: 'modelo',
        type: 'pilsner',
        turnt_scale: 4
      })
    ]);

    const allBeers = await Beer.findAll();

    expect(allBeers).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'contact haze', type: 'ipa', turnt_scale: 10 },
      { id: expect.any(String), name: 'Stemma Kolsh', type: 'kolsh', turnt_scale: 8 },
      { id: expect.any(String), name: 'modelo', type: 'pilsner', turnt_scale: 4 },
    ]));
  });

  it('should edit a beer by the id', async() => {
    const contactHaze = await Beer.insert({
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });

    const editBeer = await Beer.edit(contactHaze.id, {
      name: 'Contact Haze',
      type: 'ipa',
      turnt_scale: 9
    });

    expect(editBeer).toEqual({
      id: contactHaze.id,
      name: 'Contact Haze',
      type: 'ipa',
      turnt_scale: 9
    });
  });

  it('should delete a beer by the id', async() => {
    const contactHaze = await Beer.insert({
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });
    
    const deletedBeer = await Beer.delete(contactHaze.id);

    expect(deletedBeer).toEqual({
      id: contactHaze.id,
      name: 'contact haze',
      type: 'ipa',
      turnt_scale: 10
    });
  });
});
