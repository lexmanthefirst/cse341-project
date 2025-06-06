const BaseModel = require("./baseModel");

class StudentModel extends BaseModel {
  constructor() {
    super("students");
  }

  // Override create method if needed
  async create(studentData) {
    try {
      // Add any student-specific validation or processing here
      return await super.create(studentData);
    } catch (error) {
      console.error("Student creation error:", error);
      throw error; // Re-throw for controller to handle
    }
  }

  // Custom student methods can be added here
  async getByEmail(email) {
    return await this.getByField("email", email);
  }
}

module.exports = new StudentModel();
