/* path: api/login */

const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Create new user
router.post(
  "/new",
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

// Renew Token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
