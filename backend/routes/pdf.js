const express = require("express");
const Pdf = require("../models/Pdf");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/upload",
  auth,
  upload.single("pdf"),
  async (req, res) => {
    try {

      if (req.user.role !== "academy") {
        return res.status(403).json({ msg: "Only academy can upload" });
      }

      const { subject, className, schoolName } = req.body;

      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }

      const pdf = await Pdf.create({
        subject,
        className,
        schoolName,
        filePath: req.file.filename,
        uploadedBy: req.user.id
      });

      res.json(pdf);

    } catch (err) {
      console.error("UPLOAD ERROR =>", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// GET - my uploaded pdfs (academy only)
router.get(
  "/my",
  auth,
  async (req, res) => {

    try {

      if (req.user.role !== "academy") {
        return res.status(403).json({ msg: "Only academy can access" });
      }

      const list = await Pdf.find({
        uploadedBy: req.user.id
      }).sort({ createdAt: -1 });

      res.json(list);

    } catch (err) {
      console.error("MY PDF ERROR =>", err);
      res.status(500).json({ msg: "Server error" });
    }

  }
);

module.exports = router;