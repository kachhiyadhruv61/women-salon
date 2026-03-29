const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

/* ================= ADD IMAGE ================= */
const addGallery = async (req, res) => {
  try {
    const db = getDB();

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const newImage = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      createdAt: new Date(),
    };

    await db.collection("gallery").insertOne(newImage);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
const getGallery = async (req, res) => {
  try {
    const db = getDB();

    const data = await db
      .collection("gallery")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= GET BY ID ================= */
const getGalleryById = async (req, res) => {
  try {
    const db = getDB();

    const item = await db.collection("gallery").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= UPDATE ================= */
const updateGallery = async (req, res) => {
  try {
    const db = getDB();

    const updateData = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      updatedAt: new Date(),
    };

    const result = await db.collection("gallery").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.json({
      success: true,
      message: "Gallery updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= DELETE ================= */
const deleteGallery = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("gallery").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  addGallery,
  getGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
};