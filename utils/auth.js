// Middleware for Authentication (withAuth)
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/signinUser');
  } else {
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  }
};

// Exporting the withAuth middleware for use in other parts of the application
module.exports = withAuth;