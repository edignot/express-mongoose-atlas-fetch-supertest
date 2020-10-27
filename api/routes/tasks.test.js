const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const Task = require('../models/tasksModel')

describe('Task', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/tasks`
    await mongoose.connect(url, { useNewUrlParser: true })
  })

  afterEach(async () => {
    await Task.deleteMany()
  })

  afterAll(async () => {
    await Task.drop()
    await mongoose.connection.close()
  })

  test('Gets the test endpoint', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Not found')
    done()
  })

  test('Should save a task to database', async (done) => {
    const res = await request.post('/api/tasks').send({
      title: 'test title',
      task: 'test task',
    })

    expect(res.status).toBe(200)

    const task = await Task.findOne({ title: 'test title' })
    expect(task.title).toBeTruthy()
    expect(task.title).toBe('test title')
    expect(task.task).toBeTruthy()
    expect(task.task).toBe('test task')
    expect(task.image).toBeTruthy()

    console.log(task)

    done()
  })
})
