const express = require('express');
const  { connectDB } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://women-salon-pi.vercel.app"
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

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
        url: process.env.BACKEND_URL || "https://women-salon.onrender.com"
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

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
