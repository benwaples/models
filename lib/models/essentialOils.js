const pool = require('../utils/pool');

class Oil {
  id;
  name;
  color;
  recommend;

  constructor(oil) {
    this.id = oil.id;
    this.name = oil.name;
    this.color = oil.color;
    this.recommend = oil.recommend;
  }

  static async insert(oil) {
    const { rows } = await pool.query(
      'INSERT INTO essential_oils (name, color, recommend) VALUES ($1, $2, $3) RETURNING *', [oil.name, oil.color, oil.recommend]
    );
  
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM essential_oils WHERE id=$1', [id]
    );

    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM essential_oils'
    );

    return rows.map(oil => new Oil(oil));
  }

  static async edit(id, changedOil) {
    const { rows } = await pool.query(`
    UPDATE essential_oils
    set name=$1,
        color=$2,
        recommend=$3
    WHERE id=$4
    RETURNING *
    `, [changedOil.name, changedOil.color, changedOil.recommend, id]);

    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM essential_oils WHERE id=$1 RETURNING *', [id]
    );
    
    return new Oil(rows[0]);
  }
}

module.exports = Oil;
