const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection established successfully')
})

const port = process.env.PORT || 2000

app.listen(port, () =>
  console.log(`Server is running on port http://localhosts:${port}`),
)
