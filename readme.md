## Express Microservice

### About

:floppy_disk: This is a first microservice I have built and unit tested.

### Learning goals:
- Implement an HTTP API web server microservice.
- Interact with downstream APIs.
- Connect server to NoSQL database.
- Test API.

### Technologies Used:

- Node | Express
- MongoDB | Mongoose | MongoDB Atlas | MongoDB Compass
- Jest | Supertest
- Node Fetch

### File structure


### REST API Endpoints:

Local Server

`'http://localhost:3000/api/tasks'`

- `GET`
- `POST`

`'http://localhost:3000/api/tasks/:id'`

- `GET`
- `PATCH`
- `DELETE`

Production

`endpoints data will be updated when deployed`

### Sample GET response `http://localhost:3000/api/tasks`
```
[
    {
        "_id": "5f98a74a9c308f385709a19f",
        "title": "Learn Express",
        "task": "Build Express Node microservice",
        "image": "http://edignot.com/img1",
        "createdAt": "2020-10-27T23:03:38.233Z",
        "updatedAt": "2020-10-27T23:03:38.233Z",
        "__v": 0
    },
    {
        "_id": "5f98a7729c308f385709a1a0",
        "title": "Learn MongoDB",
        "task": "Connect MongDB to server, utilize Mongoose",
        "image": "http://edignot.com/img2",
        "createdAt": "2020-10-27T23:04:18.229Z",
        "updatedAt": "2020-10-27T23:04:18.229Z",
        "__v": 0
    }
]
``` 
### Testing

Utilized hooks to connect to local MongoDB before all tests run and disconnect after all tests finish running. Also seed testing database with testing data before each test and delete data after each test. All endpoints are tested.

```
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
```

```
 PASS  api/tests/tasks.test.js
  Task
    ✓ POST | Should save a task to database (261 ms)
    ✓ GET | Should get all tasks from a database (10 ms)
    ✓ GET | Should get a task from a database by id (10 ms)
    ✓ PATCH | Should update a task in a database by id (13 ms)
    ✓ DELETE | Should delete a task from a database by id (12 ms)
    ✓ GET | Should get error message if endpoint is not found (6 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.786 s
```
