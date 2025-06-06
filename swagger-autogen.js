const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-doc/swagger_output.json";
const endpointsFiles = ["./routes/studentRoute"];

const config = {
  info: {
    title: "School management API",
    description: "API for school admin storage and Management",
  },
  host: "localhost:5500",
  schemes: ["http"],
  components: {
    schemas: require("./swagger-doc/schemas/studentSchema"),
  },
};

swaggerAutogen(outputFile, endpointsFiles, config);
