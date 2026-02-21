const express = require("express");
const fs = require("fs");
const path = require("path");
const redis = require("../redis");

const router = express.Router();

router.get("/:file", async (req, res) => {

  try {

    const fileName = req.params.file;
    const key = "pdf:" + fileName;

    const cached = await redis.get(key);

    if (cached) {
      const buffer = Buffer.from(cached, "base64");
      res.setHeader("Content-Type", "application/pdf");
      return res.send(buffer);
    }

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      fileName
    );

    console.log("PDF PATH =>", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "PDF not found" });
    }

    const file = fs.readFileSync(filePath);

    await redis.set(
      key,
      file.toString("base64"),
      "EX",
      300
    );

    res.setHeader("Content-Type", "application/pdf");
    res.send(file);

  } catch (err) {
    console.log("PDF VIEW ERROR =>", err.message);
    res.status(500).json({ msg: "Unable to load PDF" });
  }

});

module.exports = router;