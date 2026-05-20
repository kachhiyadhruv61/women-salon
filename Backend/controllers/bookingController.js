const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const razorpay = require("../middleware/razorpay");

// ✅ GET ALL BOOKINGS
const getBookings = async (req, res, next) => {
  try {
    const db = getDB();

    let bookings;

    if (req.user.role === 'user') {
      bookings = await db.collection("bookings")
        .find({ userId: req.user._id.toString() })
        .sort({ _id: -1 })
        .toArray();
    } else {
      bookings = await db.collection("bookings")
        .find()
        .sort({ _id: -1 })
        .toArray();
    }

    res.status(200).json({
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


// ✅ CREATE BOOKING + RAZORPAY
const createBooking = async (req, res, next) => {
  try {
    const db = getDB();

    const {
      userName,
      service,
      date,
      time,
      amount,
      advanceAmount,
      paymentMethod
    } = req.body;

    // ✅ STEP 1: CREATE BOOKING
    const newBooking = {
      userId: req.user._id.toString(),
      name: userName,
      service,
      date,
      time,
      totalAmount: amount,
      advanceAmount,

      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "Pending" : "Created",
      bookingStatus: paymentMethod === "cash" ? "Confirmed" : "Pending",

      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("bookings").insertOne(newBooking);

    let razorpayBook = null;

    // ✅ STEP 2: RAZORPAY ORDER CREATE
    if (paymentMethod === "razorpay") {
      const options = {
        amount: advanceAmount * 100,
        currency: "INR",
        receipt: "booking_" + result.insertedId,
      };

      razorpayBook = await razorpay.orders.create(options);

      // ✅ STEP 3: SAVE PAYMENT DATA
      const paymentData = {
  bookingId: result.insertedId.toString(),

  userId: req.user._id.toString(),
  userName: userName,              // ✅ FIX
  contact: req.user.phone || "",   // ✅ ADD

  service: service,                // ✅ direct રાખી શકાય

  amount: advanceAmount,

  paymentMethod: "razorpay",
  paymentStatus: "Created",

  razorpayBookId: razorpayBook.id,
  razorpayPaymentId: null,         // ✅ later update થશે

  paymentPayload: {
    order: razorpayBook
  },

  createdAt: new Date(),
  updatedAt: new Date()
};
      await db.collection("bookingpay").insertOne(paymentData);

      // ✅ UPDATE BOOKING WITH ORDER ID
      await db.collection("bookings").updateOne(
        { _id: result.insertedId },
        {
          $set: {
            razorpayBookId: razorpayBook.id
          }
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: result.insertedId,
      razorpayBook: razorpayBook
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