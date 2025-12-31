const db = require('../config/database');

class Job {
  static async findByCompany(companyId, filters = {}) {
    let query = 'SELECT * FROM jobs WHERE company_id = $1 AND is_active = true';
    const values = [companyId];
    let index = 2;

    if (filters.location) {
      query += ` AND location = $${index}`;
      values.push(filters.location);
      index++;
    }

    if (filters.job_type) {
      query += ` AND job_type = $${index}`;
      values.push(filters.job_type);
      index++;
    }

    query += ' ORDER BY posted_at DESC';

    const result = await db.query(query, values);
    return result.rows;
  }

  static async create(companyId, jobData) {
    const { title, description, work_policy, location, department, employment_type, experience_level, job_type, salary_range } = jobData;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const result = await db.query(
      `INSERT INTO jobs (company_id, title, slug, description, work_policy, location, department, employment_type, experience_level, job_type, salary_range)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [companyId, title, slug, description, work_policy, location, department, employment_type, experience_level, job_type, salary_range]
    );
    return result.rows[0];
  }

  static async update(id, companyId, updates) {
    const result = await db.query(
      `UPDATE jobs SET title = COALESCE($1, title), description = COALESCE($2, description),
       location = COALESCE($3, location), job_type = COALESCE($4, job_type),
       work_policy = COALESCE($5, work_policy), updated_at = NOW()
       WHERE id = $6 AND company_id = $7
       RETURNING *`,
      [updates.title, updates.description, updates.location, updates.job_type, updates.work_policy, id, companyId]
    );
    return result.rows[0];
  }

  static async delete(id, companyId) {
    await db.query('DELETE FROM jobs WHERE id = $1 AND company_id = $2', [id, companyId]);
  }
}

module.exports = Job;
