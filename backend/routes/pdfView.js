const express = require("express");
const fs = require("fs");
const path = require("path");
const redis = require("../redis");

const router = express.Router();

router.get("/:file", async (req, res) => {

    const key = "pdf:" + req.params.file;
    const cached = await redis.get(key);

    if (cached) {
        const buffer = Buffer.from(cached, "base64");
        res.setHeader("Content-Type", "application/pdf");
        return res.send(buffer);
    }

    const filePath = path.join(
        __dirname,
        "../uploads",
        req.params.file

    );

    const file = fs.readFileSync(filePath);

    await redis.set(
        key,
        file.toString("base64"),
        "EX",
        300
    );

    res.setHeader("Content-Type", "application/pdf");
    res.send(file);

});

module.exports = router;