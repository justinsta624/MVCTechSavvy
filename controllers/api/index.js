// Importing the Express framework
const router = require('express').Router();

// Importing route modules for user, blog, and comment functionality
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes'); 
const commentRoutes = require('./commentRoutes'); 

// Configuring routes by associating route modules with specific URL paths
router.use('/users', userRoutes); // Routes related to user functionality, accessible at '/users'
router.use('/blogs', blogRoutes); // Routes related to blog functionality, accessible at '/blogs'
router.use('/comments', commentRoutes); // Routes related to comment functionality, accessible at '/comments'

// Exporting the configured router to be used in other parts of the application
module.exports = router;