const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    // USE 401 UNAUTHORIZED STATUS FOR BETTER SECURE POLICY
    res.status(401).json({ message: 'FAILED token' });
  }
};
