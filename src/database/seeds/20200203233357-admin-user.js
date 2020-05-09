const bcrypt = require('bcryptjs')

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@app.com',
          password_hash: bcrypt.hashSync('123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete('users', {})
  },
}
