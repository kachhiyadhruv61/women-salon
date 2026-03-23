const crypto = require("crypto");
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const verifyPaymentStatus = async (req, res, next) => {
  try {
    const db = getDB();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,   // 🔥 IMPORTANT (from frontend)
      amount
    } = req.body;

    // 🔐 VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "JwAYo6QQvvn0NRDV4vehC52U")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

    // ===============================
    // ✅ 1. UPDATE ORDER
    // ===============================
    await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          paymentStatus: "Paid",
          orderStatus: "Processing", // optional
          updatedAt: new Date()
        }
      }
    );

    // ===============================
    // ✅ 2. INSERT PAYMENT
    // ===============================
    await db.collection("payments").insertOne({
      orderId: orderId,
      transactionId: razorpay_payment_id,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      amount: amount,
      paymentPayload: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // ===============================
    // ✅ SUCCESS RESPONSE
    // ===============================
    res.json({
      success: true,
      message: "Payment verified & stored successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyPaymentStatus
};