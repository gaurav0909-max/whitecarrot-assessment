const db = require('../config/database');

class User {
  static async findByEmail(email) {
    const result = await db.query(
      `SELECT users.*, companies.slug as company_slug
       FROM users
       JOIN companies ON users.company_id = companies.id
       WHERE users.email = $1`,
      [email]
    );
    return result.rows[0];
  }

  static async create(email, passwordHash, companyId) {
    const result = await db.query(
      `INSERT INTO users (email, password_hash, company_id)
       VALUES ($1, $2, $3)
       RETURNING id, email, company_id, created_at`,
      [email, passwordHash, companyId]
    );
    return result.rows[0];
  }
}

module.exports = User;
