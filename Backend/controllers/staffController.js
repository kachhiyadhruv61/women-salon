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
      email: req.body.email,
      gender: req.body.gender,
      salary: req.body.salary,
      image: req.body.image,
      services: req.body.services,
      phone: req.body.phone,
      experience: req.body.experience,
      specialization: req.body.specialization,
      status: req.body.status,
      action: req.body.action,
      date: new Date(),
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
          email: req.body.email,
          gender: req.body.gender,
          salary: req.body.salary,
          image: req.body.image,
          services: req.body.services,
          phone: req.body.phone,
          experience: req.body.experience,
          specialization: req.body.specialization,
          status: req.body.status,
          action: req.body.action,
          date: new Date(),
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