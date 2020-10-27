const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const Task = require('../models/tasksModel')

const tasks = [
  { title: 'title 1', task: 'task 1' },
  { title: 'title 2', task: 'task 2' },
  { title: 'title 3', task: 'task 3' },
]

describe('Task', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/tasks`
    await mongoose.connect(url, { useNewUrlParser: true })
  })

  beforeEach(async () => {
    for (const task of tasks) {
      const newTask = new Task(task)
      await newTask.save()
    }
  })

  afterEach(async () => {
    await Task.deleteMany()
  })

  afterAll(async () => {
    await Task.drop()
    await mongoose.connection.close()
  })

  test('Should save a task to database', async (done) => {
    const res = await request.post('/api/tasks').send({
      title: 'test title',
      task: 'test task',
    })
    expect(res.status).toBe(200)
    const task = await Task.findOne({ title: 'test title' })
    expect(task.title).toBe('test title')
    expect(task.task).toBe('test task')
    expect(task.image).toBeTruthy()
    expect(task._id).toBeTruthy()
    done()
  })

  test('Should get all tasks from a database', async (done) => {
    const res = await request.get('/api/tasks')
    expect(res.status).toBe(200)
    const parsedRes = JSON.parse(res.text)
    expect(parsedRes.length).toBe(tasks.length)
    expect(parsedRes[0].title).toBe(tasks[0].title)
    expect(parsedRes[0].task).toBe(tasks[0].task)
    done()
  })

  test('Gets the test endpoint', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Not found')
    done()
  })
})
