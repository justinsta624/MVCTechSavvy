// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Blog } = require('../models'); // Importing the Sequelize model for Blog
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new blog post associated with the currently authenticated user
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    // Respond with the newly created blog post
    res.status(200).json(newBlog);
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the specified blog post. The title and content fields can be updated.
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        // Using req.params.id to identify a specific post, user_id: req.session.user_id to ensure that only the posts owned by the currently authenticated user are eligible for updating
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    // Check if any rows were updated
    if (updatedBlog[0] === 0) {
      // If no rows were updated, respond with a 404 Not Found status
      res.status(404).json({ error: 'Error has occurred' });
      return;
    }

    // Respond with a success message if the blog post was updated
    res.status(200).json({ message: 'Blog post updated successfully.' });
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a blog post if it belongs to the currently authenticated user
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // Check if the deletion was successful
    if (!blogData) {
      // If the deletion was not successful, respond with a 404 Not Found status
      res.status(404).json({ error: 'Error has occurred' });
      return;
    }

    // Respond with a 204 No Content status for a successful deletion
    res.status(204).end();
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;
