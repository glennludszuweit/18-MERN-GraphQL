import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
  return jwt.sign({ user }, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const verifyUser = (req, res, next) => {
  const token = req.header('Authorization') || '';
  if (!token) return res.status(401).send('Access denied.');
  try {
    const verified = jwt.verify(token, process.env.SECRET_JWT);
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
