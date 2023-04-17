const { check } = require("express-validator");
const { result } = require("./validate");

const validateCreate = [
  check("name").exists().not().isEmpty(),
  check("taskcreationdate").exists().not().isEmpty().isDate(),
  check("taskstartdate").exists().not().isEmpty().isDate(),
  check("taskcompletiondate").exists().not().isEmpty().isDate(),
  check("idemployee").isNumeric().exists().not().isEmpty(),
  check("idstate").isNumeric().exists().not().isEmpty(),
  (req, res, next) => {
    result(req, res, next);
  },
];

module.exports = { validateCreate };
