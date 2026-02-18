const express = require("express");
const Pdf = require("../models/Pdf");

const router = express.Router();

router.get("/", async (req, res) => {

    const { subject, className, schoolName } = req.query;

    const filter = {};

    if (subject) filter.subject = subject;
    if (className) filter.className = className;
    if (schoolName) filter.schoolName = schoolName;

    const list = await Pdf.find(filter).sort({ createdAt: -1 });

    res.json(list);
});

module.exports = router;