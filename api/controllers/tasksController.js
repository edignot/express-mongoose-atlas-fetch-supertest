const Task = require('../models/tasksModel')
const fetch = require('node-fetch')

exports.get_all_tasks = (req, res) => {
  Task.find()
    .then((tasks) =>
      tasks.length ? res.json(tasks) : res.json({ message: 'No tasks found' }),
    )
    .catch((error) => res.status(400).json({ error }))
}

exports.post_new_task = async (req, res) => {
  let image

  await fetch('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3')
    .then((response) => response.json())
    .then((response) => (image = response.results[0].href))
    .catch((error) => console.log(error))

  const newTask = new Task({
    title: req.body.title,
    task: req.body.task,
    image: image,
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
