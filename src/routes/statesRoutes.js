const { Router } = require("express");
const router = Router();

const { getStates, getCategory} = require("../controllers/controllers.js");

router.get("/States", getStates);
router.get("/Categorys", getCategory);

module.exports = router;
