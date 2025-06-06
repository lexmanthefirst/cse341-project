const { ObjectId } = require("bson");
const BaseController = require("./baseController");
const studentModel = require("../models/studentModel");

class StudentController extends BaseController {
  constructor() {
    super(studentModel);
  }

  createStudent = async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        classId,
        degreeId,
        address,
      } = req.body;

      const newStudent = {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        classId: new ObjectId(classId),
        degreeId: degreeId ? new ObjectId(degreeId) : null,
        address,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdStudent = await this.model.create(newStudent);

      res.status(201).json(createdStudent);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new StudentController();
