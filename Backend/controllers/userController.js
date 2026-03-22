const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// ✅ GET ALL USERS
const getUsers = async (req, res, next) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().sort({ _id: -1 }).toArray();

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET USER BY ID
const getUserById = async (req, res, next) => {
  try {
    const db = getDB();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};


// ✅ CREATE USER
const createUser = async (req, res, next) => {
  try {
    const db = getDB();
  console.log("Create user with data:",req.body);//log incoming data

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role || "user",
      gender: req.body.gender,
      address: req.body.address,
      pincode: req.body.pincode,
      emailOtp: req.body.emailOtp || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log("inserted payload:",);
    const result = await db.collection("users").insertOne(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ LOGIN USER
const loginUser = async (req, res, next) => {
  try {
    const db = getDB();
    const { username, password } = req.body;

    // 🔐 Admin static login
    if (username === "admin" && password === "admin123") {
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        data: {
          username: "admin",
          role: "admin"
        }
      });
    }

    // 👤 Check user in MongoDB
    const user = await db.collection("users").findOne({
      username: username,
      password: password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const db = getDB();

    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User updated successfully"
    });

  } catch (error) {
    next(error);
  }
};


// ✅ DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};