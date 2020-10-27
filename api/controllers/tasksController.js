const { json } = require('express')
const Task = require('../models/tasksModel')

exports.get_all_tasks = (req, res) => {
  Task.find()
    .then((tasks) =>
      tasks.length ? res.json(tasks) : res.json({ message: 'No tasks found' }),
    )
    .catch((error) => res.status(400).json({ error }))
}

exports.post_new_task = (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    task: req.body.task,
  })
  newTask
    .save()
    .then(() => res.json(newTask))
    .catch((error) => res.status(400).json({ error }))
}

exports.get_task = (req, res) => {
  Task.findById(req.params.id)
    .then((task) =>
      task
        ? res.json(task)
        : res.status(400).json({ message: 'Task not found' }),
    )
    .catch((error) => res.json({ error }))
}

exports.update_task = (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, task) => (error ? res.status(400).json({ error }) : res.json(task)),
  )
}

exports.delete_task = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task deleted' }))
    .catch((error) => res.status(400).json({ error }))
}
