import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import router from "./routes/indexRoute";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/register", (req, res) => {
  res.json({ message: "Welcome to Registration page" });
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT} go and catch it`);
});

export default app;
