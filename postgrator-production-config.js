

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
  "host": process.env.PROD_MIGRATION_DATABASE_HOST,
  "port": process.env.PROD_MIGRATION_DATABASE_PORT,
  "database": process.env.PROD_MIGRATION_DATABASE_NAME,
  "username": process.env.PROD_MIGRATION_DATABASE_USER,
  "password": process.env.MIGRATION_DATABASE_PASS,
  "ssl": true
}