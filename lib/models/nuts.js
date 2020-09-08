const pool = require('../utils/pool');

class Nut {
  id;
  name;
  size;
  isGood;

  constructor(nut) {
    this.id = nut.id;
    this.name = nut.name;
    this.size = nut.size;
    this.isGood = nut.is_good;
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

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM nuts'
    );

    return rows.map(nut => new Nut(nut));
  }

  static async edit(id, changedNut) {
    const { rows } = await pool.query(`
      UPDATE nuts
      set name=$1,
          size=$2,
          is_good=$3
      WHERE id=$4
      RETURNING *
    `, [changedNut.name, changedNut.size, changedNut.isGood, id]);

    return rows[0];
  }
}

module.exports = Nut;
