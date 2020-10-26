exports.get_all_tasks = (req, res) => {
  res.json({ message: 'get all tasks' })
}

exports.post_new_task = (req, res) => {
  res.json({ message: 'post new task' })
}

exports.get_task = (req, res) => {
  res.json({ message: 'get task' })
}

exports.update_task = (req, res) => {
  res.json({ message: 'update task' })
}

exports.delete_task = (req, res) => {
  res.json({ message: 'delete task' })
}
