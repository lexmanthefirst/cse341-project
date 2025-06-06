const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const studentSchema = require("./schemas/studentSchema");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School management API",
      version: "1.0.0",
      description: "API for school admin storage and Management",
    },
    servers: [
      {
        url: "http://localhost:5500/api",
      },
    ],
    components: {
      schemas: {
        student: studentSchema,
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};
const specs = swaggerDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/api-docs.json", (req, res) => {
    res.json(specs);
  });
};
