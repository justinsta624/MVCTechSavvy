// Importing the Express framework and the User model
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// Log in route (POST to handle login logic)
router.post('/login', async (req, res) => {
    try {
        console.log('login')
        // Check if the username entered matches one in the database
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            // If no user is found with the provided username, respond with a 400 status
            res.status(400).json({ message: 'Username not found' });
            return;
        }

        // Check if the password entered matches the stored hashed password in the database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            // If the password is incorrect, respond with a 400 status
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        console.log(userData)   
        // Set up session after a successful login
        req.session.save(() => {
            req.session.user_id = userData.user_id; // Save the user's ID in the session
            req.session.logged_in = true; // Set the logged_in flag to true

            // Respond with user data and a success message
            res.json({ user: userData, message: 'Successfully logged in!' });
        });

    } catch (err) {
        console.log(err)
        // Handle errors by sending a 400 Bad Request response with the error details
        res.status(400).json(err);
    }
});

// Get All users
router.get('/', (req, res) => {
    // Retrieve all users from the database excluding the password attribute
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData)) // Respond with the retrieved user data in JSON format
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handle errors by sending a 500 Internal Server Error response
        });
});

// Get a single user by id number
router.get('/:id', (req, res) => {
    // Retrieve a single user by id, excluding the password attribute
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['post_id', 'post_title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['comment_id', 'comment_content', 'created_at']
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Sign up a new user (create a new entry in the user table of the db)
router.post('/', async (req, res) => {
    try {
        // Create a new user by inserting data from req.body into the User model
        const userData = await User.create(req.body);

        // Set up session after a successful signup
        req.session.save(() => {
            req.session.user_id = userData.user_id; // Save the user's ID in the session
            req.session.logged_in = true; // Set the logged_in flag to true

            // Respond with the user data
            res.status(201).json(userData);
        });
    } catch (err) {
        // Handle errors by sending a 400 Bad Request response with the error details
        res.status(400).json(err);
    }
});

// Log out route
router.post('/signoutUser', (req, res) => {
    if (req.session.logged_in) {
        // If the user is logged in, destroy the session to log them out
        req.session.destroy(() => {
            res.status(201).end(); // Respond with a 201 status indicating successful logout
        });
    } else {
        // If the user is not logged in, respond with a 404 status
        res.status(404).end();
    }
});

// Update a user by id number
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Delete a user by id number
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Exporting the router for use in other parts of the application
module.exports = router;