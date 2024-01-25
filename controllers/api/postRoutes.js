// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Post, User, Comment } = require('../../models'); // Importing the Sequelize model for Post
const withAuth = require('../../utils/auth'); // Importing authentication middleware

// get all Posts
router.get('/', (req, res) => {
  // Retrieve all Posts with associated user and comments
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']], // Order by creation date in descending order
    include: [
      {
        model: User, // Include the User model to get information about the author
        attributes: ['username']
      },
      {
        model: Comment, // Include the Comment model to get associated comments
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User, // Include the User model for each comment to get the username
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData)) // Respond with the retrieved data in JSON format
    .catch(err => {
      console.log(err);
      res.status(500).json(err); // Handle errors by sending a 500 Internal Server Error response
    });
});

// get a specific Post by ID
router.get('/:id', (req, res) => {
  // Retrieve a specific post by ID with associated user and comments
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User, // Include the User model to get information about the author
        attributes: ['username']
      },
      {
        model: Comment, // Include the Comment model to get associated comments
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User, // Include the User model for each comment to get the username
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' }); // Respond with a 404 Not Found status if no post is found
        return;
      }
      res.json(dbPostData); // Respond with the retrieved data in JSON format
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err); // Handle errors by sending a 500 Internal Server Error response
    });
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post associated with the currently authenticated user
    const newPost = await Post.create({
      title: req.body.title,
      post_text: req.body.content, // Corrected field name from 'content' to 'post_text'
      user_id: req.session.user_id,
    });

    // Respond with the newly created post
    res.status(201).json(newPost);
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the specified post. The title and content fields can be updated.
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.content, // Corrected field name from 'content' to 'post_text'
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
    if (updatedPost[0] === 0) {
      // If no rows were updated, respond with a 404 Not Found status
      res.status(404).json({ error: 'Error has occurred' });
      return;
    }

    // Respond with a success message if the post was updated
    res.status(201).json({ message: 'Post updated successfully.' });
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json({ error: 'Error has occurred' });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a post if it belongs to the currently authenticated user
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // Check if the deletion was successful
    if (!postData) {
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
