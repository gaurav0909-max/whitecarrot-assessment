const db = require('../config/database');

class Company {
  static async findBySlug(slug) {
    const result = await db.query(
      'SELECT * FROM companies WHERE slug = $1',
      [slug]
    );
    return result.rows[0];
  }

  static async create(name, slug, description = '') {
    const result = await db.query(
      `INSERT INTO companies (name, slug, description)
       VALUES ($1, $2, $3)
       RETURNING id, name, slug, description, logo_url, banner_url, theme, is_published, created_at`,
      [name, slug, description]
    );
    return result.rows[0];
  }

  static async update(slug, updates) {
    const fields = [];
    const values = [];
    let index = 1;

    Object.keys(updates).forEach(key => {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    });

    fields.push('updated_at = NOW()');
    values.push(slug);

    const result = await db.query(
      `UPDATE companies SET ${fields.join(', ')} WHERE slug = $${index} RETURNING *`,
      values
    );
    return result.rows[0];
  }
}

module.exports = Company;
