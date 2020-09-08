const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  color;
  size;

  constructor(fruit) {
    this.id = fruit.id;
    this.name = fruit.name;
    this.color = fruit.color;
    this.size = fruit.size;
  }

  static async insert(fruit){
    const { rows } = await pool.query(
      'INSERT INTO fruits (name, color, size) VALUES ($1, $2, $3) RETURNING *', [fruit.name, fruit.color, fruit.size]
    );

    return rows[0];
  }

  static async findById(id){
    const { rows } = await pool.query(
      'SELECT * FROM fruits WHERE id=$1', [id]
    );

    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM fruits'
    );

    return rows.map(fruit => new Fruit(fruit));
  }


}

module.exports = Fruit;
