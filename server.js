const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Database connected')
})

const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () =>
  console.log(`Server is running on port http://localhosts:${port}`),
)
