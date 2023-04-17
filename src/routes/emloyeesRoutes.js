const { Router } = require("express");
const router = Router();
const { validateCreate } = require("../validators/employeesValidation");

const {
  getEmployees,
  deleteEmployees,
  postEmployees,
  putEmployees,
  getEmployeesById,
} = require("../controllers/controllers.js");

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeesById);
router.post("/postEmployees", validateCreate, postEmployees);
router.put("/putEmployees/:id", validateCreate, putEmployees);
router.delete("/deleteEmployees/:id", deleteEmployees);

module.exports = router;
