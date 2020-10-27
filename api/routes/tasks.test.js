const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const Task = require('../models/tasksModel')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/tasks`
  await mongoose.connect(url, { useNewUrlParser: true })
})

afterEach(async () => {
  await Task.deleteMany()
})

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/')
  expect(res.status).toBe(404)
  expect(res.body.error).toBe('Not found')
  done()
})

it('Should save a task to database', async (done) => {
  const res = await request.post('/api/tasks').send({
    title: 'TESTINGSS',
    task: 'another',
  })
  expect(res.status).toBe(200)
  const task = await Task.findOne({ title: 'TESTINGSS' })

  console.log(task)
  done()
})
