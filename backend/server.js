require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Use Atlas connection string from Render env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log("Mongo error:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/search", require("./routes/search"));
app.use("/api/view", require("./routes/pdfView"));

// Use Render provided port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
