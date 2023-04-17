const { Router } = require("express");
const router = Router();
const { validateCreate } = require("../validators/tasksValidation");

const {
  getTasks,
  deleteTasks,
  postTasks,
  putTasks,
  getTasksById,
} = require("../controllers/controllers.js");

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTasksById);
router.post("/postTasks", validateCreate, postTasks);
router.put("/putTasks/:id", validateCreate, putTasks);
router.delete("/deleteTasks/:id", deleteTasks);

module.exports = router;
