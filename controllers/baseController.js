const asyncHandler = require("express-async-handler");

class BaseController {
  constructor(model) {
    this.model = model;
  }

  getAll = asyncHandler(async (req, res) => {
    const data = await this.model.getAll();
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  });

  getById = asyncHandler(async (req, res) => {
    const data = await this.model.getById(req.params.id);
    if (!data) {
      res.status(404);
      throw new Error("Resource not found");
    }

    res.status(200).json({
      success: true,
      data,
    });
  });

  create = asyncHandler(async (req, res) => {
    const data = await this.model.create(req.body);
    if (!data) {
      res.status(400);
      throw new Error("Failed to create resource");
    }

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data,
    });
  });

  updateById = asyncHandler(async (req, res) => {
    const updated = await this.model.updateById(req.params.id, req.body);
    if (!updated) {
      res.status(404);
      throw new Error("Failed to update: Resource not found");
    }

    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: updated,
    });
  });

  deleteById = asyncHandler(async (req, res) => {
    const deleted = await this.model.deleteById(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error("Failed to delete: Resource not found");
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  });
}

module.exports = BaseController;
