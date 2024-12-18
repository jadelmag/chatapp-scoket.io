const jwt = require("jsonwebtoken");

const validateJWT = (req, resp, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return resp.status(401).json({
        ok: false,
        msg: "Empty token",
      });
    }

    const { uid, name } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return resp.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
