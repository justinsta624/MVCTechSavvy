// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Blog, User } = require('../models'); // Importing Sequelize models for Blog and User
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Dashboard route /dashboard. Access is restricted by middleware to logged-in users only
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Get all blog posts created by the logged-in user
        const blogData = await Blog.findAll({
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
        const blogs = blogData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into the template
        res.render('dashboard', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Render the form to create a new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { logged_in: req.session.logged_in });
});

// Handle the creation of a new Blog post
router.post('/new', withAuth, async (req, res) => {
    try {
        // Create a new blog post associated with the logged-in user
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        // Redirect to the dashboard after successfully creating the post
        res.redirect('/dashboard');
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Handle Blog post deletion
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete a blog post if it belongs to the logged-in user
        const affectedRows = await Blog.destroy({
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
