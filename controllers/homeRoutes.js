// Importing the Express framework and required models and utilities
const router = require('express').Router();
const { Post, User, Comment } = require('../models'); // Importing Sequelize models for Post, User, and Comment
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Route to display all Post posts on the homepage
router.get('/', async (req, res) => {
    try {
        // Get all Post posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into the template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in // Include information about the user's login status in the template
        });
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Route to display a single post and its comments
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        // Get a specific post by its primary key (id) and JOIN with user and comment data
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['text'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });

        // Serialize data so the template can read it
        const post = postData.get({ plain: true });

        // Pass serialized data and session flag into the template
        res.render('post', {
            ...Post,
            logged_in: req.session.logged_in // Include information about the user's login status in the template
        });
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Route to add a comment on a specific post
router.post('/post/:id/comment', withAuth, async (req, res) => {
    try {
        // Create a new comment associated with a post and user
        const newComment = await Comment.create({
            text: req.body.text,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });

        // Redirect to the post page after successfully adding the comment
        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
        // Handle errors by sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Error has occurred' });
    }
});

// Exporting the router for use in other parts of the application
module.exports = router;