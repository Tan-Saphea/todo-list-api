const express = require("express");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/todo.controller");

// use routes
const router = express.Router();

// routes
router.route("/").post(create).get(findAll);
router.route("/:id").get(findOne).patch(update).delete(remove);

module.exports = router;
