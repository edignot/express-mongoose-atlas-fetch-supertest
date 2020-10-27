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

  test('POST | Should save a task to database', async (done) => {
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

  test('GET | Should get all tasks from a database', async (done) => {
    const res = await request.get('/api/tasks')
    expect(res.status).toBe(200)

    const parsedRes = JSON.parse(res.text)
    expect(parsedRes.length).toBe(tasks.length)
    expect(parsedRes[0].title).toBe(tasks[0].title)
    expect(parsedRes[0].task).toBe(tasks[0].task)

    done()
  })

  test('GET | Should get a task from a database by id', async (done) => {
    const task = await Task.findOne({ title: tasks[0].title })

    const res = await request.get(`/api/tasks/${task._id}`)
    expect(res.status).toBe(200)

    const parsedRes = JSON.parse(res.text)
    expect(parsedRes.title).toBe(tasks[0].title)
    expect(parsedRes.task).toBe(tasks[0].task)

    done()
  })

  test('PATCH | Should update a task in a database by id', async (done) => {
    const tasks = await Task.find()

    const res = await request.patch(`/api/tasks/${tasks[0]._id}`).send({
      title: 'updated title',
      task: 'updated task',
    })
    expect(res.status).toBe(200)

    const updatedTask = await Task.findById(tasks[0]._id)
    expect(updatedTask.title).toBe('updated title')
    expect(updatedTask.task).toBe('updated task')

    done()
  })

  test('DELETE | Should delete a task from a database by id', async (done) => {
    const tasksBeforeDelete = await Task.find()

    const res = await request.delete(`/api/tasks/${tasksBeforeDelete[0]._id}`)
    expect(res.status).toBe(200)

    const tasksAfterDelete = await Task.find()
    expect(tasksBeforeDelete.length).toBe(tasksAfterDelete.length + 1)

    const taskNotFound = await Task.findById(tasksBeforeDelete[0]._id)
    expect(taskNotFound).not.toBeTruthy()

    done()
  })

  test('GET | Should get error message if endpoint is not found', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Not found')

    done()
  })
})
