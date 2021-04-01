const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
if (NODE_ENV === 'development') require('dotenv').config();



const notesRouter = require('./notes/notes-router')
const foldersRouter = require('./folders/folders-router')

const app = express()

const { CLIENT_ORIGIN } = require('./config');

app.use(cors());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

  app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
  }))

app.use(helmet())

app.use('/notes', notesRouter)
app.use('/folders', foldersRouter)

app.get('/', function (req, res) {
  res.send('Hello World');
})


app.get('/', function (req, res) {
  let notes = [];
  res.send({notes});
})

app.post('/', function (req, res) {
  let notes = [];
  res.send({notes});
})

app.post('/', function (req, res) {
  let folders = [];
  res.send({folders});
})

app.get('/', function (req, res) {
  let folders = [];
  res.send({folders});
})

app.use(function errorHandler(error, req, res, next) {
  let response
  console.error(error)
  if (NODE_ENV === 'production1') {
    response = { error: { message: 'server error' } }
  } else {
    
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})


module.exports = app