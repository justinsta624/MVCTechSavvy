const { Blog } = require('../models');

const blogData = [
    {
        blog_title: 'node.js',
        blog_content: 'Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to build server-side and networked applications using JavaScript.',
        blog_date: '2024-01-01',
        active_ind: '1',
        user_id: '1'
    },
    {
        blog_title: 'MYSQL',
        blog_content: 'MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) for managing and manipulating data.',
        blog_date: '2024-01-02',
        active_ind: '1',
        user_id: '2'
    },
    {
        blog_title: 'RESTful APIs',
        blog_content: 'RESTful APIs (Representational State Transfer APIs) are a set of architectural principles and conventions for designing and implementing web services.',
        blog_date: '2024-01-03',
        active_ind: '1',
        user_id: '3'
    },
    {
        blog_title: 'Bcrypt',
        blog_content: 'Bcrypt is a password-hashing function designed to securely hash passwords.',
        blog_date: '2024-01-04',
        active_ind: '1',
        user_id: '1'
    },
    {
        blog_title: '(Inactive) Model View Controller (MVC)',
        blog_content: 'Model-View-Controller (MVC) is a software architectural pattern commonly used in the design and development of user interfaces in software applications.',
        blog_date: '2024-01-05',
        active_ind: '0',
        user_id: '2'
    },
    {
        blog_title: 'DOTENV',
        blog_content: 'DOTENV is a Node.js module that helps manage environment variables in applications by loading them from a file named .env.',
        blog_date: '2024-01-06',
        active_ind: '1',
        user_id: '4'
    },
    {
        blog_title: '(Inactive) Sequelize',
        blog_content: 'Sequelize is a popular Object-Relational Mapping (ORM) library for Node.js which provides a powerful set of features to interact with relational databases using JavaScript.',
        blog_date: '2024-01-07',
        active_ind: '0',
        user_id: '3'
    },
    {
        blog_title: 'Handlebars.js',
        blog_content: 'Handlebars.js is a popular JavaScript templating engine that simplifies the process of dynamically generating HTML by combining data with templates.',
        blog_date: '2024-01-08',
        active_ind: '1',
        user_id: '5'
    },

];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
