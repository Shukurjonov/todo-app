const { database } = require('./connection');

class Todo {
  static async getTodos(params) {
    const sql = `
      SELECT 
        id, name, description, todo_time, is_completed, created_at, updated_at
      FROM todos t
      WHERE t.state = true
      ORDER BY todo_time;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async getTodo(params) {
    const sql = `
      SELECT 
        id, name, description, todo_time, is_completed, created_at, updated_at
      FROM todos t
      WHERE t.state = true AND t.id = $1
      ORDER BY todo_time;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async createTodo(params) {
    const sql = `
      INSERT INTO todos (
        name, description, todo_time
      ) values ( $1, $2, $3 )
      RETURNING id, name, description, todo_time, is_completed;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateTodo(params) {
    const sql = `
      UPDATE todos SET
        name = coalesce($1, name),
        description = coalesce($2, description),
        todo_time = coalesce($3, todo_time),
        is_completed = coalesce($4, is_completed)
      WHERE id = $5
      RETURNING id, name, description, todo_time, is_completed;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async deleteTodo(params) {
    const sql = `
      UPDATE todos SET
        state = false
      WHERE id = $1
      RETURNING id;
  `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Todo