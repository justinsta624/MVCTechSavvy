// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Comment } = require('../../models'); // Importing the Sequelize model for Comment
const withAuth = require('../../utils/auth'); // Importing authentication middleware

// get all comments
router.get('/', (req, res) => {
  // Retrieve all comments from the database
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData)) // Respond with the retrieved data in JSON format
    .catch(err => {
      console.log(err);
      res.status(500).json(err); // Handle errors by sending a 500 Internal Server Error response
    });
});

// Create a new comment on a blog post
router.post('/:post_id', withAuth, async (req, res) => {
  try {
    // Create a new comment associated with a specific blog post and user
    const newComment = await Comment.create({
      text: req.body.text,
      post_id: req.params.post_id, // Get the post_id from the request parameters
      user_id: req.session.user_id, // Get the user_id from the authenticated session
    });

    // Respond with the newly created comment
    res.status(200).json(newComment);
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Delete a comment by ID
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id // Delete the comment with the specified ID
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' }); // Respond with a 404 Not Found status if no comment is found
        return;
      }
      res.json(dbCommentData); // Respond with the data of the deleted comment in JSON format
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err); // Handle errors by sending a 500 Internal Server Error response
    });
});

// Exporting the router for use in other parts of the application
module.exports = router;