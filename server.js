const app = require('./app')

const port = process.env.PORT || 2000

app.listen(port, () =>
  console.log(`Server is running on port http://localhosts:${port}`),
)
