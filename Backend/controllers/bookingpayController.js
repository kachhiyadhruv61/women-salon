const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// ✅ GET ALL BOOKING PAYMENTS
const getBookings = async (req, res, next) => {
  try {
    const db = getDB();

    const payments = await db
      .collection("payments")
      .find({ paymentType: "booking" }) // 🔥 only booking
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET BOOKING PAYMENT BY ID
const getBookingById = async (req, res, next) => {
  try {
    const db = getDB();

    const payment = await db.collection("payments").findOne({
      _id: new ObjectId(req.params.id),
      paymentType: "booking"
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Booking payment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });

  } catch (error) {
    next(error);
  }
};


// ✅ CREATE BOOKING PAYMENT
const createBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const {
      bookingId,
      amount,
      paymentMethod,
      paymentStatus,
      userName,
      contact
    } = req.body;

    // ✅ VALIDATION
    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Booking ID, amount and payment method required"
      });
    }

    const newPayment = {
      paymentType: "booking", // 🔥 important
      bookingId,
      amount,
      paymentMethod,
      paymentStatus: paymentStatus || "pending",
      userName,
      contact,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("payments").insertOne(newPayment);

    res.status(201).json({
      success: true,
      message: "Booking payment created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE BOOKING PAYMENT
const updateBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("payments").updateOne(
      {
        _id: new ObjectId(req.params.id),
        paymentType: "booking"
      },
      {
        $set: {
          ...req.body,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking payment updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE BOOKING PAYMENT
const deleteBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("payments").deleteOne({
      _id: new ObjectId(req.params.id),
      paymentType: "booking"
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking payment deleted successfully"
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