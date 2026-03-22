const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL STAFF
const getStaff = async (req, res, next) => {
  try {
    const db = getDB();
    const staff = await db.collection("staff").find().sort({ _id: -1 }).toArray();

    res.status(200).json({
      success: true,
      data: staff
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET STAFF BY ID
const getStaffById = async (req, res, next) => {
  try {
    const db = getDB();
    const staff = await db.collection("staff").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    res.status(200).json({
      success: true,
      data: staff
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE STAFF
const createStaff = async (req, res, next) => {
  try {
    const db = getDB();

    const newStaff = {
      name: req.body.name,
      role: req.body.role,
      services: req.body.services,
      phone: req.body.phone,
      experience: req.body.experience,
      status: req.body.status,
      action: req.body.action,
      createdAt: new Date()
    };

    const result = await db.collection("staff").insertOne(newStaff);

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE STAFF
const updateStaff = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("staff").updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: {
          name: req.body.name,
          role: req.body.role,
          services: req.body.services,
          phone: req.body.phone,
          experience: req.body.experience,
          status: req.body.status,
          action: req.body.action,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE STAFF
const deleteStaff = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("staff").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
};