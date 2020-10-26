const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/tasks', require('./api/routes/tasksRouter'))

module.exports = app
