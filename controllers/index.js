// Importing the Express framework and creating a Router instance
const router = require('express').Router();

// Importing route modules for different parts of the application
const apiRoutes = require('./api'); // Importing routes related to API endpoints
const homeRoutes = require('./homeRoutes'); // Importing routes related to the home page
const dashboardRoutes = require('./dashboardRoutes'); // Importing routes related to the dashboard

// Configuring routes by associating route modules with specific URL paths
router.use('/api', apiRoutes); // Routes for the '/api' path
router.use('/dashboard', dashboardRoutes); // Routes for the '/dashboard' path
router.use('/', homeRoutes); // Routes for the root path ('/')

// Exporting the configured router to be used in other parts of the application
module.exports = router;