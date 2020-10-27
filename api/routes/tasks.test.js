const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

beforeAll(async () => {
  const uri = `mongodb://127.0.0.1/tasks`
  mongoose.connect(uri, { useNewUrlParser: true })
})

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/something')
  expect(res.body.error).toBe('Not found')
  done()
})
