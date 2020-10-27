const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/tasks', require('./api/routes/tasksRouter'))

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

// app.use((error, req, res, next) => {
//   res.status(500).json({ error: error.message })
// })

module.exports = app
