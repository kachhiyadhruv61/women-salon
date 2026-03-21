const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL NOTIFICATIONS
const getNotifications = async (req, res, next) => {
  try {
    const db = getDB();
    const notifications = await db.collection("notifications").find().toArray();

    res.status(200).json({
      success: true,
      data: notifications
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET NOTIFICATION BY ID
const getNotificationById = async (req, res, next) => {
  try {
    const db = getDB();
    const notification = await db.collection("notifications").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE NOTIFICATION
const createNotification = async (req, res, next) => {
  try {
    const db = getDB();

    const newNotification = {
      title: req.body.title,
      message: req.body.message,
      type: req.body.type || "info",
      recipient: req.body.recipient || "User",
      status: "unread",
      createdAt: new Date()
    };

    const result = await db.collection("notifications").insertOne(newNotification);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE NOTIFICATION
const updateNotification = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("notifications").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE NOTIFICATION
const deleteNotification = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("notifications").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};