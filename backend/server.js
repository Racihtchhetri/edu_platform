require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/edu")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log("Mongo error:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/search", require("./routes/search"));
app.use("/api/view", require("./routes/pdfView"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
