require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");


// Initialize Express
const app = express();

// Connect Database
connectDb();

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})