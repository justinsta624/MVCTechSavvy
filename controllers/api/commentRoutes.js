// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Comment } = require('../models'); // Importing the Sequelize model for Comment
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Create a new comment on a blog post
router.post('/:post_id', withAuth, async (req, res) => {
  try {
    // Create a new comment associated with a specific blog post and user
    const newComment = await Comment.create({
      text: req.body.text,
      post_id: req.params.post_id,
      user_id: req.session.user_id,
    });

    // Respond with the newly created comment
    res.status(200).json(newComment);
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;