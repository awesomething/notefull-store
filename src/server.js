const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')

const database = knex({
      client: 'pg',
      connection: DATABASE_URL,
    })

app.get('/api/', (req, res, next) => {
      res.json({ok: true});
    });

app.set('database', database)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = app