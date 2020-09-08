const pool = require('../utils/pool');

class Fruit {
  name;
  color;
  size;

  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }

  static async insert(fruit){
    const { rows } = await pool.query(
      'INSERT INTO fruits (name, color, size) VALUES ($1, $2, $3) RETURNING *', [fruit.name, fruit.color, fruit.size]
    );

    return rows[0];
  }


}

module.exports = Fruit;
