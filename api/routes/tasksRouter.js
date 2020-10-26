const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router
  .route('/')
  .get(tasksController.get_all_tasks)
  .post(tasksController.post_new_task)

router
  .route('/:id')
  .get(tasksController.get_task)
  .patch(tasksController.update_task)
  .delete(tasksController.delete_task)

module.exports = router
