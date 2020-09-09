const pool = require('../utils/pool');

class Beer {
  id;
  name;
  type;
  turnt_scale;

  constructor(beer) {
    this.id = beer.id;
    this.name = beer.name;
    this.type = beer.type;
    this.turnt_scale = beer.turnt_scale;
  }

  static async insert(beer) {
    const { rows } = await pool.query(
      'INSERT INTO beers (name, type, turnt_scale) VALUES ($1, $2, $3) RETURNING *', [beer.name, beer.type, beer.turnt_scale]
    );

    console.log(rows);

    return rows[0];
  }
}

module.exports = Beer;
