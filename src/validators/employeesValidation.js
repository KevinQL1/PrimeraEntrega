const { check } = require("express-validator");
const { result } = require("./validate");

const validateCreate = [
  check("name").exists().not().isEmpty(),
  check("startdate").exists().not().isEmpty().isDate(),
  check("salary").isNumeric().exists().not().isEmpty(),
  (req, res, next) => {
    result(req, res, next);
  },
];

module.exports = { validateCreate };
