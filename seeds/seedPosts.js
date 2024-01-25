const { Post } = require('../models');

const postData = [
    {
        post_id: '1',
        post_title: 'node.js',
        post_content: 'Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to build server-side and networked applications using JavaScript.',
        post_date: '2024-01-01',
        active_ind: '1',
        user_id: '1'
    },
    {
        post_id: '2',
        post_title: 'MYSQL',
        post_content: 'MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) for managing and manipulating data.',
        post_date: '2024-01-02',
        active_ind: '1',
        user_id: '2'
    },
    {
        post_id: '3',
        post_title: 'RESTful APIs',
        post_content: 'RESTful APIs (Representational State Transfer APIs) are a set of architectural principles and conventions for designing and implementing web services.',
        post_date: '2024-01-03',
        active_ind: '1',
        user_id: '3'
    },
    {
        post_id: '4',
        post_title: 'Bcrypt',
        post_content: 'Bcrypt is a password-hashing function designed to securely hash passwords.',
        post_date: '2024-01-04',
        active_ind: '1',
        user_id: '1'
    },
    {
        post_id: '5',
        post_title: '(Inactive) Model View Controller (MVC)',
        post_content: 'Model-View-Controller (MVC) is a software architectural pattern commonly used in the design and development of user interfaces in software applications.',
        post_date: '2024-01-05',
        active_ind: '0',
        user_id: '2'
    },
    {
        post_id: '6',
        post_title: 'DOTENV',
        post_content: 'DOTENV is a Node.js module that helps manage environment variables in applications by loading them from a file named .env.',
        post_date: '2024-01-06',
        active_ind: '1',
        user_id: '4'
    },
    {
        post_id: '7',
        post_title: '(Inactive) Sequelize',
        post_content: 'Sequelize is a popular Object-Relational Mapping (ORM) library for Node.js which provides a powerful set of features to interact with relational databases using JavaScript.',
        post_date: '2024-01-07',
        active_ind: '0',
        user_id: '3'
    },
    {
        post_id: '8',
        post_title: 'Handlebars.js',
        post_content: 'Handlebars.js is a popular JavaScript templating engine that simplifies the process of dynamically generating HTML by combining data with templates.',
        post_date: '2024-01-08',
        active_ind: '1',
        user_id: '5'
    },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
