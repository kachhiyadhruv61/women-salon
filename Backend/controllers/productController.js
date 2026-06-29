const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find().sort({ _id: -1 }).toArray();

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const db = getDB();

    const product = await db.collection("products").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const db = getDB();

    const newProduct = {
      name: req.body.name,
      amount: req.body.amount,
      suggestedFor: req.body.suggestedFor,
      ingredients: req.body.ingredients,
      stock: req.body.stock,
      description: req.body.description,
      status: req.body.status,
      action: req.body.action,
      image: req.file ? req.file.filename : req.body.image,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("products").insertOne(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      insertedId: result.insertedId
    });

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          amount: req.body.amount,
          suggestedFor: req.body.suggestedFor,
          ingredients: req.body.ingredients,
          stock: req.body.stock,
          description: req.body.description,
          status: req.body.status,
          action: req.body.action,
          image: req.file ? req.file.filename : req.body.image,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};
// ✅ UPDATE STOCK ONLY
const updateStock = async (req, res, next) => {
  try {
    const db = getDB();
    const { qty } = req.body; // +10 or -5

    const product = await db.collection("products").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const newStock = product.stock + qty;

    // ❌ prevent negative stock
    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative"
      });
    }

    await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          stock: newStock,
          updatedAt: new Date()
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      stock: newStock
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
};
