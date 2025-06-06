const { getDB } = require("../data/database");
const { ObjectId } = require("bson");

class BaseModel {
  constructor(collectionName) {
    this.collectionName = collectionName;

    // Lazy-load db and collection
    Object.defineProperty(this, "db", {
      get: () => getDB(),
      enumerable: true,
      configurable: true,
    });

    Object.defineProperty(this, "collection", {
      get: () => this.db.collection(this.collectionName),
      enumerable: true,
      configurable: true,
    });
  }

  toObjectId(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId format");
    }
    return new ObjectId(id);
  }

  // CRUD Operations
  //Get all documents
  async getAll(filter = {}) {
    return await this.collection.find(filter).toArray();
  }

  //Get document by ID
  async getById(id) {
    const result = await this.collection.findOne({ _id: this.toObjectId(id) });
    if (!result) throw new Error("Document not found");
    return result;
  }

  //Create Document
  async create(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid document data");
    }
    const result = await this.collection.insertOne(data);
    return await this.getById(result.insertedId);
  }

  //Update document by ID
  async updateById(id, data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid update data");
    }
    const result = await this.collection.updateOne(
      { _id: this.toObjectId(id) },
      { $set: data }
    );
    if (result.matchedCount === 0) throw new Error("Document not found");
    return result.modifiedCount > 0;
  }

  //Delete Document By Id
  async deleteById(id) {
    const result = await this.collection.deleteOne({
      _id: this.toObjectId(id),
    });
    if (result.deletedCount === 0) throw new Error("Document not found");
    return true;
  }

  // Advanced query methods
  async getByField(field, value) {
    const result = await this.collection.findOne({ [field]: value });
    if (!result) throw new Error("Document not found");
    return result;
  }

  async getAllPaginated({ page = 1, limit = 10, filter = {}, sort = {} }) {
    const skip = (page - 1) * limit;
    const data = await this.collection
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalCount = await this.collection.countDocuments(filter);

    return {
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    };
  }

  // Utility methods
  async countDocuments(filter = {}) {
    return await this.collection.countDocuments(filter);
  }

  async exists(filter) {
    const count = await this.countDocuments(filter);
    return count > 0;
  }

  async aggregate(pipeline) {
    return await this.collection.aggregate(pipeline).toArray();
  }
}

module.exports = BaseModel;
