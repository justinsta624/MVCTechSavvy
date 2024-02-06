// Importing the Express framework and required models and utilities
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models'); // Importing Sequelize models for Post, User, and Comment
const withAuth = require('../utils/auth'); // Importing authentication middleware

// Log in route (GET to render login page)
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'post_id',
        'post_title',
        "post_content",
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template
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
  
  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
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
      //serialize the data
      const post = dbPostData.get({ plain: true });
  
      //pass data to the template
      res.render('single-post', {
        post, 
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  module.exports = router;