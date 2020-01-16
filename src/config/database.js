module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'quizdb',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
}
