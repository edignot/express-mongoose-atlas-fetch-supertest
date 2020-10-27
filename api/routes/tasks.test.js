const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/something')
  expect(res.body.error).toBe('Not found')
  done()
})
