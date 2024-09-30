require('dotenv').config()
const express = require("express");
const app = express();
const jobRouter = require("./routes/jobRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors())
app.use(express.json());

connectDB();

// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`)
// })  
