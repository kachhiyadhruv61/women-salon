let services = [
  {
    serviceId: 1,
    name: "Hair Spa",
    duration: "60 mins",
    amount: 1200,
    fishtankStatus: "Available",
    serviceStatus: "Active",
    createdAt: "2026-02-15",
    updatedAt: "2026-02-15"
  },
  {
    serviceId: 2,
    name: "Organic Facial",
    duration: "45 mins",
    amount: 900,
    fishtankStatus: "Not Available",
    serviceStatus: "Active",
    createdAt: "2026-02-16",
    updatedAt: "2026-02-16"
  }
];

const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// ✅ GET ALL SERVICES
const getServices = async (req, res, next) => {
  try {
    const db = getDB();
    const services = await db.collection("services").find().sort({ _id: -1 }).toArray();

    res.status(200).json({
      success: true,
      data: services
    });

  } catch (error) {
    next(error);
  }
};

// ✅ GET SERVICE BY ID
const getServiceById = async (req, res, next) => {
  try {
    const db = getDB();
    const service = await db.collection("services").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE SERVICE
const createService = async (req, res, next) => {
  try {
    const db = getDB();

    const newService = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      shapes: req.body.shapes || [],
      includes: req.body.includes || [],
      isActive: req.body.isActive ?? true,
      duration: req.body.duration,
      amount: req.body.amount,
      fishtankStatus: req.body.fishtankStatus,
      serviceStatus: req.body.serviceStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("services").insertOne(newService);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      insertedId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE SERVICE
const updateService = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          categoryId: req.body.categoryId,
          name: req.body.name,
          description: req.body.description,
          shapes: req.body.shapes || [],
          includes: req.body.includes || [],
          isActive: req.body.isActive ?? true,
          duration: req.body.duration,
          amount: req.body.amount,
          fishtankStatus: req.body.fishtankStatus,
          serviceStatus: req.body.serviceStatus,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// ✅ DELETE SERVICE
const deleteService = async (req, res, next) => {
  try {
    const db = getDB();

    const result = await db.collection("services").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

const getCollection = (name) => async (req, res, next) => {
  try {
    const db = getDB();
    const data = await db.collection(name).find().sort({ _id: -1 }).toArray();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createCollectionItem = (name) => async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection(name).insertOne({
      ...req.body,
      createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Created successfully",
      insertedId: result.insertedId
    });
  } catch (error) {
    next(error);
  }
};

const updateCollectionItem = (name) => async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection(name).updateOne(
      { _id: new ObjectId(req.params.id) },
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
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      message: "Updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

const deleteCollectionItem = (name) => async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection(name).deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceCategories: getCollection("serviceCategories"),
  createServiceCategory: createCollectionItem("serviceCategories"),
  updateServiceCategory: updateCollectionItem("serviceCategories"),
  deleteServiceCategory: deleteCollectionItem("serviceCategories"),
  getServiceVariants: getCollection("serviceVariants"),
  createServiceVariant: createCollectionItem("serviceVariants"),
  updateServiceVariant: updateCollectionItem("serviceVariants"),
  deleteServiceVariant: deleteCollectionItem("serviceVariants"),
  getServicePackages: getCollection("servicePackages"),
  createServicePackage: createCollectionItem("servicePackages"),
  updateServicePackage: updateCollectionItem("servicePackages"),
  deleteServicePackage: deleteCollectionItem("servicePackages")
};
