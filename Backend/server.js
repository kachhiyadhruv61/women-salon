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

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

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