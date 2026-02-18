const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    subject: String,
    className: String,
    schoolName: String,
    filePath: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Pdf", pdfSchema);