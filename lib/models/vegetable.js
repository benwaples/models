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

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM vegetables'
    );

    return rows.map(veg => new Vegetable(veg));
  }

  static async edit(id, edits) {
    const { rows } = await pool.query(`
    UPDATE vegetables
      SET name=$1,
          color=$2,
          size=$3
      WHERE id=$4
      RETURNING *
    `, [edits.name, edits.color, edits.size, id]);

    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM vegetables WHERE id=$1 RETURNING *', [id]
    );

    return rows[0];
  }

}

module.exports = Vegetable;
