const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// ✅ GET ALL REGISTERS
const getRegisters = async (req, res, next) => {
  try {
    const db = getDB();
    const registers = await db.collection("registers").find().toArray();

    res.json({
      success: true,
      data: registers
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET REGISTER BY ID
const getRegisterById = async (req, res, next) => {
  try {
    const db = getDB();

    const register = await db.collection("registers").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!register) {
      return res.status(404).json({
        success: false,
        message: "Register record not found"
      });
    }

    res.json({
      success: true,
      data: register
    });

  } catch (error) {
    next(error);
  }
};


// ✅ CREATE REGISTER
const createRegister = async (req, res, next) => {
  try {
    const db = getDB();

    const newRegister = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user",
      phone: req.body.phone,
      gender: req.body.gender,
      emailOtp: req.body.emailOtp || null,
      address: req.body.address,
      pincode: req.body.pincode,
      // createdAt: new Date(),
      // updatedAt: new Date()
    };

   await db.collection("users").insertOne({
      ...newRegister,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    });

     res.json({
      success: true,
      message: "user is registered"
    });
  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE REGISTER
const updateRegister = async (req, res, next) => {
  try {
    const db = getDB();

    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await db.collection("registers").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Register record not found"
      });
    }

    res.json({
      success: true,
      message: "Register updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE REGISTER
const deleteRegister = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("registers").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Register record not found"
      });
    }

    res.json({
      success: true,
      message: "Register deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getRegisters,
  getRegisterById,
  createRegister,
  updateRegister,
  deleteRegister
};