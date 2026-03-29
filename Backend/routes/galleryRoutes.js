const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery Management API (Salon & Farmhouse Images)
 */

// 📦 STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /gallery:
 *   post:
 *     summary: Upload new gallery image
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: Bridal Makeup
 *               category:
 *                 type: string
 *                 example: Salon
 *               description:
 *                 type: string
 *                 example: Premium bridal look
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/gallery", upload.single("image"), async (req, res) => {
  try {
    const db = getDB();

    const newImage = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      createdAt: new Date(),
    };

    await db.collection("gallery").insertOne(newImage);

    res.json({
      success: true,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Get all gallery images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of gallery images
 */
router.get("/gallery", async (req, res) => {
  try {
    const db = getDB();

    const data = await db
      .collection("gallery")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/**
 * @swagger
 * /gallery/{id}:
 *   get:
 *     summary: Get single gallery image by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gallery ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gallery item found
 *       404:
 *         description: Not found
 */
router.get("/gallery/:id", async (req, res) => {
  try {
    const db = getDB();

    const item = await db.collection("gallery").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/**
 * @swagger
 * /gallery/{id}:
 *   put:
 *     summary: Update gallery image details
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gallery updated
 */
router.put("/gallery/:id", async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("gallery").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          updatedAt: new Date(),
        },
      }
    );

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/**
 * @swagger
 * /gallery/{id}:
 *   delete:
 *     summary: Delete gallery image
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gallery deleted
 */
router.delete("/gallery/:id", async (req, res) => {
  try {
    const db = getDB();

    await db.collection("gallery").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;