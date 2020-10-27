const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Task = require('../models/tasksModel')

beforeAll(async () => {
  const uri = `mongodb://127.0.0.1/tasks`
  mongoose.connect(uri, { useNewUrlParser: true })
})

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/')
  expect(res.body.error).toBe('Not found')
  done()
})

it('Should save a task to database', async (done) => {
  const res = await request.post('/api/tasks').send({
    title: 'TESTINGS',
    task: 'another',
  })

  const task = await Task.findOne({ title: 'TESTINGS' })

  console.log(task)
  done()
})
