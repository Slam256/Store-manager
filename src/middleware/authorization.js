import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (error) {
    return res.status(401).json({ message: "invalid Token" });
  }
  return next();
};
export default verifyToken;
