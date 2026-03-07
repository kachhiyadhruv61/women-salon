const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// ✅ GET ALL PAYMENTS
const getPayments = async (req, res, next) => {
  try {
    const db = getDB();
    const payments = await db.collection("payments").find().toArray();

    res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET PAYMENT BY ID
const getPaymentById = async (req, res, next) => {
  try {
    const db = getDB();

    const payment = await db.collection("payments").findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.body.userId)
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
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

// ✅ CREATE PAYMENT
const createPayment = async (req, res, next) => {
  try {
    const db = getDB();

    const newPayment = {
      transactionId: req.body.transactionId,
      userId: req.body.userId, // optionally convert to ObjectId if needed
      paymentMode: req.body.paymentMode,
      amount: req.body.amount,
      status: req.body.status,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("payments").insertOne(newPayment);

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE PAYMENT
const updatePayment = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("payments").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          transactionId: req.body.transactionId,
          userId: req.body.userId,
          paymentMode: req.body.paymentMode,
          amount: req.body.amount,
          status: req.body.status,
          date: req.body.date ? new Date(req.body.date) : new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE PAYMENT
const deletePayment = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("payments").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
