const pool = require('../utils/pool');

class Vegetable {
  name;
  color; 
  size;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.size = row.size;
  }

  static async insert(vegetable) {
    const { rows } = await pool.query(
      'INSERT INTO vegetables (name, color, size) VALUES ($1, $2, $3) RETURNING *', [vegetable.name, vegetable.color, vegetable.size]
    );

    return new Vegetable(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM vegetables WHERE id=$1', [id]
    );

    return rows[0];
  }

}

module.exports = Vegetable;
