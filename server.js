const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/middleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5555;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use(errorHandler);
app.listen(port, () => console.log(`server started on port :${port}`));
