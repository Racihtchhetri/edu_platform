const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1]; // remove Bearer

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR =>", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};