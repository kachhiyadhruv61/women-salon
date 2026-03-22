const crypto = require("crypto");
// ✅ VERIFY PAYMENT STATUS
const verifyPaymentStatus = async (req, res, next) => {
  try {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", "JwAYo6QQvvn0NRDV4vehC52U")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment verified" });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }

  } catch (error) {
    next(error);
  }
};


module.exports = {
  verifyPaymentStatus
};