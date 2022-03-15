const jwt = require("jsonwebtoken");

module.exports.apptokencheck = async (req, res, next) => {
  let generaltoken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("appId")
  ) {
    try {
     generaltoken=req.headers.authorization
      if (String(generaltoken) === String(process.env.appid)) {
        next();
      } else {
        return res.status(401).json({
          message: "Could Not Authorize!",
        });
      }
    } catch (err) {
      if (!err.statusCode) {
        return res.status(401).json({
          message: "Not Authorized!",
        });
      }
    }
  }
  if (!generaltoken) {
    return res.status(401).json({
      message: "Could Not Authorize!",
    });
  }
};
