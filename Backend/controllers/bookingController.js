const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// ✅ GET ALL BOOKINGS
const getBookings = async (req, res, next) => {
  try {
    const db = getDB();

    const bookings = await db.collection("bookings").find().toArray();

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET BOOKING BY ID
const getBookingById = async (req, res, next) => {
  try {
    const db = getDB();

    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    next(error);
  }
};


// ✅ CREATE BOOKING
const createBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const newBooking = {
      name: req.body.name,
      service: req.body.service,
      date: req.body.date,
      status: req.body.status || "Pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("bookings").insertOne(newBooking);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE BOOKING
const updateBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE BOOKING
const deleteBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("bookings").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};