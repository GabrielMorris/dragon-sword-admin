const basicAuth = require('express-basic-auth');

// Auth
const authMiddleware = basicAuth({
  users: { admin: process.env.ADMIN_PASS },
  unauthorizedResponse: getUnauthorizedResponse
});

function getUnauthorizedResponse(req) {
  return req.auth
    ? `user: ${req.auth.user} pass: ${req.auth.password} rejected`
    : 'No credentials provided';
}

module.exports = authMiddleware;
