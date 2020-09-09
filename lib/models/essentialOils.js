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
    this.recommend = oil.recomment;
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

}

module.exports = Oil;
