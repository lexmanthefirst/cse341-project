const router = require("express").Router();
const studentsRoute = require("./studentRoute");

router.get("/", (req, res) => {
  res.send("Welcome to the School Management Api");
});

router.use("/students", studentsRoute);

module.exports = router;
