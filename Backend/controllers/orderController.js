const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL ORDERS
const getOrders = async (req, res, next) => {
  try {
    const db = getDB();
    const orders = await db.collection("orders").find().toArray();

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET ORDER BY ID
const getOrderById = async (req, res, next) => {
  try {
    const db = getDB();

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE ORDER
const createOrder = async (req, res, next) => {
  try {
    const db = getDB();
     const { items } = req.body;

    // 🔥 STEP 1: CHECK & REDUCE STOCK
    for (const item of items) {
      const product = await db.collection("products").findOne({
        _id: new ObjectId(item.productId)
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`
        });
      }

      // ❌ Out of stock
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      // ✅ Reduce stock safely
      const result = await db.collection("products").updateOne(
        {
          _id: new ObjectId(item.productId),
          stock: { $gte: item.qty }
        },
        {
          $inc: { stock: -item.qty }
        }
      );

      // ⚠️ safety check
      if (result.modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Stock update failed"
        });
      }
    }


    const newOrder = {
      userId: req.body.userId ?? "12314", // optionally convert to ObjectId
      userName: req.body.userName,
      contact: req.body.contact,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      totalAmount: req.body.totalAmount,
      orderStatus: req.body.orderStatus,
      items: req.body.items,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("orders").insertOne(newOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE ORDER
const updateOrder = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          userId: req.body.userId,
          paymentMode: req.body.paymentMode,
          paymentStatus: req.body.paymentStatus,
          amount: req.body.amount,
          orderStatus: req.body.orderStatus,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CANCEL ORDER (USER)
const cancelOrder = async (req, res, next) => {
  try {
    const db = getDB();

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled"
      });
    }

    // 🔥 RESTORE STOCK
    for (const item of order.items) {
      await db.collection("products").updateOne(
        { _id: new ObjectId(item.productId) },
        {
          $inc: { stock: item.qty }
        }
      );
    }

    await db.collection("orders").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          orderStatus: "Cancelled",
          updatedAt: new Date()
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE ORDER
const deleteOrder = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("orders").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  cancelOrder,
  deleteOrder
};