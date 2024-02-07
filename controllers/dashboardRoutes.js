// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Post, User, Comment } = require('../models'); // Importing Sequelize models for Post and User
const withAuth = require('../utils/auth'); // Importing authentication middleware

// get all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['post_id', 'post_title', 'post_content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['comment_id', 'comment_content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    .then(dbPostData => {
      //serialize the data before passing to the template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// get a specific Post by ID
router.get('/edit/:id', (req, res) => {
    // Retrieve a specific post by ID with associated user and comments
    Post.findOne({
      where: {
        post_id: req.params.id
      },
      attributes: ['post_id', 'post_title', 'post_content', 'created_at'],
      include: [
        {
          model: User, // Include the User model to get information about the author
          attributes: ['username']
        },
        {
          model: Comment, // Include the Comment model to get associated comments
          attributes: ['comment_id', 'comment_content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User, // Include the User model for each comment to get the username
            attributes: ['username']
          }
        }
      ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        //serialize the data
        const post = dbPostData.get({ plain: true });
        // pass to the template
        res.render('changePost', {
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Dashboard route /dashboard. Access is restricted by middleware to logged-in users only
router.get('/', withAuth, async (req, res) => {
    try {
        console.log(req.session)
        // Get all Post posts created by the logged-in user
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)    
        // Pass serialized data and session flag into the template
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err)
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Render the form to create a new post
router.get('/new', withAuth, (req, res) => {
    res.render('addPost', { logged_in: req.session.logged_in });
});

// Handle the creation of a new Post post
router.post('/new', withAuth, async (req, res) => {
    try {
        // Create a new post associated with the logged-in user
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.json(newPost)
        // Redirect to the dashboard after successfully creating the post
        // res.redirect('/dashboard');
    } catch (err) {
        console.log(err)
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: err });
    }
});

// Handle post deletion
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete a post if it belongs to the logged-in user
        const affectedRows = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // Send appropriate response based on the success of the deletion
        if (affectedRows > 0) {
            res.status(200).end(); // Successful deletion
        } else {
            res.status(404).end(); // No matching post found for deletion
        }
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Exporting the router for use in other parts of the application
module.exports = router;
