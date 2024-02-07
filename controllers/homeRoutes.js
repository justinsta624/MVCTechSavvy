// Importing the Express framework and required models and utilities
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models'); // Importing Sequelize models for Post, User, and Comment
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Log in route (GET to render login page)
router.get('/login', (req, res) => {
    // Check if the user is already logged in, redirect to the homepage if true
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Render the login page
    res.render('login');
});

// Homepage route (GET)
router.get('/', (req, res) => {
    // Retrieve all posts with associated user and comments
    Post.findAll({
        attributes: [
            'post_id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // Serialize the data before passing to the homepage template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // Pass a single post object into the homepage template
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Single post route (GET)
router.get('/post/:id', (req, res) => {
    // Retrieve a specific post by ID with associated user and comments
    Post.findOne({
        where: {
            post_id: req.params.id
        },
        attributes: [
            'post_id',
            'post_title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'comment_id',
                    'comment_content',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this id' });
                return;
            }
            // Serialize the data
            const post = dbPostData.get({ plain: true });

            // Pass data to the template
            res.render('singlePost', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Exporting the router for use in other parts of the application
module.exports = router;