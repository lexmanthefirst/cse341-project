const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Standard CRUD routes from BaseController
router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.put("/:id", studentController.updateById);
router.delete("/:id", studentController.deleteById);

// Custom route
router.post("/", studentController.createStudent);

module.exports = router;
