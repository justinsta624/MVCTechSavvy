// Importing the Express framework
const router = require('express').Router();

// Importing route modules for user, post, and comment functionality
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes'); 
const commentRoutes = require('./commentRoutes'); 

// Configuring routes by associating route modules with specific URL paths
router.use('/users', userRoutes); // Routes related to user functionality, accessible at '/users'
router.use('/posts', postRoutes); // Routes related to post functionality, accessible at '/posts'
router.use('/comments', commentRoutes); // Routes related to comment functionality, accessible at '/comments'

// Exporting the configured router to be used in other parts of the application
module.exports = router;