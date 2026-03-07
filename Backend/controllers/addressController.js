const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL ADDRESSES
const getAddresses = async (req, res, next) => {
  try {
    const db = getDB();
    const addresses = await db.collection("addresses").find().toArray();

    res.status(200).json({
      success: true,
      data: addresses
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET ADDRESS BY ID
const getAddressById = async (req, res, next) => {
  try {
    const db = getDB();
    const address = await db.collection("addresses").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    res.status(200).json({
      success: true,
      data: address
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE ADDRESS
const createAddress = async (req, res, next) => {
  try {
    const db = getDB();

    const newAddress = {
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      pincode: req.body.pincode,
      location: req.body.location,
      createdAt: new Date()
    };

    const result = await db.collection("addresses").insertOne(newAddress);

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE ADDRESS
const updateAddress = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("addresses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE ADDRESS
const deleteAddress = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("addresses").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
};