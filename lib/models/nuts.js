const pool = require('../utils/pool');

class Nut {
  name;
  size;
  isGood;

  constructor(nut) {
    this.name = nut.name;
    this.size = nut.size;
    this.isGood = nut.IsGood;
  }

  static async insert(nut){
    const { rows } = await pool.query(
      'INSERT INTO nuts (name, size, is_good) VALUES ($1, $2, $3) RETURNING *', [nut.name, nut.size, nut.isGood]
    );

    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM nuts WHERE id=$1', [id]
    );

    return rows[0];
  }
}

module.exports = Nut;
