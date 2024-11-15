const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const resumeRoutes = require("./routes/resume.route");
const path = require('path');

const app = express();

//dotenv config
dotenv.config();

//database config
mongoDB();

app.use(express.json());

// Corrected path handling
const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));

//middlewares
app.use(cors({
  origin: "*",
}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", resumeRoutes);

//middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
