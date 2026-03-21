const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL CONTACTS
const getContacts = async (req, res, next) => {
  try {
    const db = getDB();
    const contacts = await db.collection("contacts").find().toArray();

    res.status(200).json({
      success: true,
      data: contacts
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET CONTACT BY ID
const getContactById = async (req, res, next) => {
  try {
    const db = getDB();
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE CONTACT
const createContact = async (req, res, next) => {
  try {
    const db = getDB();

    const newContact = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      action: req.body.action || "Open",
      createdAt: new Date()
    };

    const result = await db.collection("contacts").insertOne(newContact);

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE CONTACT
const updateContact = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE CONTACT
const deleteContact = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};