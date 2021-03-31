require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
  "host": process.env.MIGRATION_DATABASE_HOST,
  "port": process.env.MIGRATION_DATABASE_PORT,
  "database": process.env.MIGRATION_DATABASE_NAME,
  "username": process.env.MIGRATION_DATABASE_USER,
  "password": process.env.MIGRATION_DATABASE_PASS,
  
}

/*{
  "migrationDirectory": "migrations",
  "driver": "pg",
  "host": "ec2-52-45-73-150.compute-1.amazonaws.com",
  "port": 5432,
  "database": "ddlhb3l5cftjo",
  "username": "ruukxcstvyvwod",
  "password": "11486604166a9045c6377d72f12d9e897ef4820c47820c6f6fbb6f754fc56f43"
}*/