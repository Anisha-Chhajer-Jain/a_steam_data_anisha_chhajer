// src/middleware/auth.js
// ---------------------------------------------------------------------------
// Mock Authentication Middleware (Stateless — for learning/practice purposes)
// protect  → attaches a hardcoded admin user to req.user
// authorize → always passes (mimics role-based access control)
// ---------------------------------------------------------------------------

const protect = (req, res, next) => {
  req.user = {
    _id: "6650b2849b20b22a5c531d04",
    name: "Anisha Chhajer Admin",
    email: "anisha_admin@test.com",
    role: "admin"
  };
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // Always authorized in stateless/practice mode
    next();
  };
};

module.exports = { protect, authorize };