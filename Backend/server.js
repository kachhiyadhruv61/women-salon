const express = require('express');
const  { connectDB } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ❗ IMPORTANT: routes pehla json parse na karo for multipart
app.use("/uploads", express.static("uploads"));

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/', orderRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/', contactRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/', paymentRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/', bookingRoutes);

const bookingpayRoutes = require('./routes/bookingpayRoutes');
app.use('/', bookingpayRoutes);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/', serviceRoutes);

const addressRoutes = require('./routes/addressRoutes');
app.use('/', addressRoutes);


const staffRoutes = require('./routes/staffRoutes');
app.use('/', staffRoutes);

const otpRoutes = require('./routes/otpRoutes');
app.use('/', otpRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/', notificationRoutes);

const verifyPaymentRoutes = require('./routes/verifyPaymentRoutes');
app.use('/', verifyPaymentRoutes);

const GalleryRoutes = require('./routes/galleryRoutes');
app.use('/', GalleryRoutes);

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

// ✅ JSON (routes pachi mukvo better for safety)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Swagger Setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "Express API with Routes and Controller"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js"], // Important change
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  await connectDB();

  app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
  });
};

startServer();
