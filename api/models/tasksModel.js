const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    task: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
)

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task
